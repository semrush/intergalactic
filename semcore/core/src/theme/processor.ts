import fs from 'fs/promises';
import glob from 'fast-glob';
import postcss from 'postcss';
import valuesParser from 'postcss-value-parser';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { processTokens, tokensToCss, tokensToJs, tokensToJson } from './utils';

type Token = {
  name: string;
  value: string;
  description?: string;
};

export const writeIfChanged = async (path: string, content: string) => {
  try {
    const originalContent = await fs.readFile(path, 'utf-8');
    if (originalContent.replace(/[\s\n]/g, '') === content.replace(/[\s\n]/g, '')) {
      return;
    }
  } catch {}
  await fs.writeFile(path, content);
};

const defaultTheme = 'light';
const themes = ['light', 'dark'];

const warning = !process.argv.includes('--no-warning');

const dirname = resolvePath(fileURLToPath(import.meta.url), '..');
const excludeTokens = JSON.parse(
  await fs.readFile(resolvePath(dirname, './exclude-tokens.json'), 'utf-8'),
);

const autoTheme: Record<string, { name: string; value: string; description: string }[]> = {};

for (const theme of themes) {
  const prefix = 'intergalactic';
  const { base, tokens } = JSON.parse(
    await fs.readFile(resolvePath(dirname, `./${theme}.json`), 'utf-8'),
  );

  let { processedTokens, values, types, rawValues, descriptions } = processTokens(
    base,
    tokens,
    prefix,
  );

  for (const excludeToPath in excludeTokens) {
    const excludeList: string[] = excludeTokens[excludeToPath];
    const excludedTokens: typeof processedTokens = [];
    processedTokens = processedTokens.filter((token) => {
      const exclude = excludeList.includes(token.name);
      if (exclude) excludedTokens.push(token);
      return !exclude;
    });

    if (excludedTokens.length > 0) {
      const path = excludeToPath.replace('{theme}', theme);
      await writeIfChanged(`${path}.css`, tokensToCss(excludedTokens));
      await writeIfChanged(`${path}.json`, tokensToJson(excludedTokens));
      if (theme === defaultTheme) {
        const path = excludeToPath.replace('{theme}', 'default');
        await writeIfChanged(`${path}.css`, tokensToCss(excludedTokens));
        await writeIfChanged(`${path}.json`, tokensToJson(excludedTokens));
      }
    }
  }

  await writeIfChanged(
    `./semcore/core/src/theme/themes/${theme}.css`,
    tokensToCss(processedTokens),
  );
  await writeIfChanged(`./semcore/core/src/theme/themes/${theme}.ts`, tokensToJs(processedTokens));

  autoTheme[theme] = processedTokens;

  const usages: { [tokenName: string]: string[] } = {};
  if (theme === defaultTheme) {
    await writeIfChanged(
      './semcore/core/src/theme/themes/default.css',
      tokensToCss(processedTokens),
    );
    await writeIfChanged('./semcore/core/src/theme/themes/default.ts', tokensToJs(processedTokens));

    const projectCssPaths = (
      await glob('./semcore/*/src/**/*.shadow.css', {
        ignore: ['node_modules', 'lib'],
      })
    ).filter((path) => {
      if (path.split('/').some((pathPart) => ['chart', 'email', 'table'].includes(pathPart))) {
        return false;
      }
      return true;
    });

    const projectCssContents = await Promise.all(
      projectCssPaths.map((path) => fs.readFile(path, 'utf-8')),
    );

    const usedVariables: any = {};

    const colorLiterals: { path: string; name: string }[] = [];

    const processedCss = await Promise.all(
      projectCssContents.map((cssContent, fileIndex) =>
        postcss([
          {
            postcssPlugin: 'variables-explored',
            prepare: (result) => {
              const traverseAst = (nodes: any[]) => {
                for (const node of nodes) {
                  if (node.nodes) {
                    traverseAst(node.nodes);
                  }
                  if (node.value) {
                    const valueAst = valuesParser(node.value);
                    const traverseValueAst = (nodes: any[], parent: any) => {
                      for (const valueNode of nodes) {
                        if (valueNode.nodes) traverseValueAst(valueNode.nodes, valueNode);
                        if (valueNode.type === 'function' && valueNode.value === 'color-mod') {
                          throw new Error(
                            `Found restricted function color-mod in ${projectCssPaths[fileIndex]}`,
                          );
                        }

                        const parentIsVariable =
                          parent?.type === 'function' && parent?.value === 'var';
                        if (!parentIsVariable) {
                          const prevNode = node.parent.nodes[node.parent.nodes.indexOf(node) - 1];
                          const skipNode =
                            prevNode?.type === 'comment' &&
                            prevNode.text.trim() === 'disable-tokens-validator';
                          if (skipNode) continue;

                          if (
                            valueNode.type === 'word' &&
                            (valueNode.value.startsWith('#') || valueNode.value.startsWith('rgb'))
                          ) {
                            const location = `${node.source.start.line}:${node.source.start.offset}`;
                            colorLiterals.push({
                              path: `${projectCssPaths[fileIndex]}:${location}`,
                              name: valueNode.value,
                            });
                          }
                          if (
                            valueNode.type === 'word' &&
                            valueNode.value.endsWith('px') &&
                            (node.prop.includes('padding') ||
                              node.prop.includes('margin') ||
                              node.prop.includes('radius') ||
                              node.prop.includes('font-size'))
                          ) {
                            const location = `${node.source.start.line}:${node.source.start.offset}`;
                            colorLiterals.push({
                              path: `${projectCssPaths[fileIndex]}:${location}`,
                              name: valueNode.value,
                            });
                          }
                        }
                        if (valueNode.type !== 'function' || valueNode.value !== 'var') continue;
                        const variableName = valueNode.nodes[0].value;
                        if (!variableName.startsWith(`--${prefix}`)) {
                          // if (legacyCssVariables[variableName] !== undefined) {
                          //   legacyCssVariables[variableName]++;
                          // }
                          continue;
                        }
                        const hasDefault = valueNode.nodes.length === 3;
                        if (!hasDefault) {
                          valueNode.nodes.push(
                            {
                              type: 'div',
                              sourceIndex: -1,
                              value: ',',
                              before: '',
                              after: ' ',
                            },
                            {
                              type: 'word',
                              sourceIndex: -1,
                              value: '',
                            },
                          );
                        }
                        const withoutPrefix = variableName.substring(`--${prefix}-`.length);
                        usedVariables[withoutPrefix] = true;
                        if (!values[withoutPrefix]) {
                          throw new Error(
                            `Variable ${variableName} is used in project but not presented in design tokens list`,
                          );
                        }
                        valueNode.nodes[2].type = 'word';
                        valueNode.nodes[2].value = values[withoutPrefix];
                        valueNode.nodes[2].nodes = [];
                        valueNode.nodes.length = 3;
                        usages[withoutPrefix] = usages[withoutPrefix] ?? [];
                        usages[withoutPrefix].push(projectCssPaths[fileIndex]);
                      }
                    };
                    traverseValueAst(valueAst.nodes, null);
                    node.value = valueAst.toString();
                  }
                }
              };
              traverseAst(result.root.nodes);
              return {};
            },
          },
        ]).process(cssContent, {
          from: undefined,
        }),
      ),
    );
    await Promise.all(
      projectCssPaths.map((path, index) => writeIfChanged(path, processedCss[index].css)),
    );

    const unusedVariables: string[] = [];
    for (const variable in values) {
      if (!usedVariables[variable]) {
        unusedVariables.push(variable);
      }
    }

    if (warning) {
      if (unusedVariables.length > 0) {
        // biome-ignore lint/suspicious/noConsoleLog:
        console.log('Unused design tokens:');
        // biome-ignore lint/suspicious/noConsoleLog:
        console.log(unusedVariables.join('\n'));
      }
      if (colorLiterals.length > 0) {
        // biome-ignore lint/suspicious/noConsoleLog:
        console.log('Unexpected color literals:');
        for (const literal of colorLiterals) {
          // biome-ignore lint/suspicious/noConsoleLog:
          console.log(`${literal.name} in ${literal.path}`);
        }
      }
    }

    const designTokensDocumentation: {
      name: string;
      type: string;
      rawValue: string;
      computedValue: string;
      description: string;
      components: string[];
    }[] = [];

    for (const token in values) {
      const components = [
        ...new Set((usages[token] ?? []).map((cssPath) => cssPath.split('/')[2])),
      ];
      components.sort((a, b) => a.localeCompare(b));

      designTokensDocumentation.push({
        name: `--${prefix}-${token}`,
        type: types[token],
        rawValue: rawValues[token],
        computedValue: values[token],
        description: descriptions[token],
        components,
      });
    }

    const baseTokensDocumentation: Token[] = [];

    const processGroup = (group: string, data: any) => {
      for (const key in data) {
        if (data[key].value) {
          const token: Token = {
            name: `--${group}-${key}`,
            value: data[key].value,
          };

          if (data[key].description?.trim()) {
            token.description = data[key].description;
          }

          baseTokensDocumentation.push(token);
        } else {
          processGroup(`${group}-${key}`, data[key]);
        }
      }
    };

    for (const group in base) {
      processGroup(group, base[group]);
    }

    await writeIfChanged(
      resolvePath(dirname, '../../../../website/docs/style/design-tokens/design-tokens.json'),
      JSON.stringify(designTokensDocumentation, null, 2) + '\n',
    );
    await writeIfChanged(
      resolvePath(dirname, '../../../../website/docs/style/design-tokens/base-tokens.json'),
      JSON.stringify(baseTokensDocumentation, null, 2) + '\n',
    );
  }
}

const autoThemeLines: string[] = [];
for (const theme in autoTheme) {
  const selector = theme === defaultTheme ? ':root' : `.${theme}`;
  autoThemeLines.push(tokensToCss(autoTheme[theme], selector));
}

await writeIfChanged('./semcore/core/src/theme/themes/auto.css', autoThemeLines.join('\n'));

execSync('pnpm lint:css --fix', {
  encoding: 'utf-8',
  cwd: resolvePath(dirname, '../../../../'),
  stdio: ['inherit', 'inherit', 'inherit'],
});
