import fs from 'fs/promises';
import glob from 'fast-glob';
import postcss from 'postcss';
import valuesParser from 'postcss-value-parser';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { processTokens, tokensToCss, tokensToJson } from './utils';

const defaultTheme = 'light';
const themes = ['light', 'dark'];

const warning = !process.argv.includes('--no-warning');

const dirname = resolvePath(fileURLToPath(import.meta.url), '..');
const excludeTokens = JSON.parse(
  await fs.readFile(resolvePath(dirname, './exclude-tokens.json'), 'utf-8'),
);

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
      await fs.writeFile(`${path}.css`, tokensToCss(excludedTokens));
      await fs.writeFile(`${path}.json`, tokensToJson(excludedTokens));
      if (theme === defaultTheme) {
        const path = excludeToPath.replace('{theme}', 'default');
        await fs.writeFile(`${path}.css`, tokensToCss(excludedTokens));
        await fs.writeFile(`${path}.json`, tokensToJson(excludedTokens));
      }
    }
  }

  await fs.writeFile(`./semcore/utils/src/themes/${theme}.css`, tokensToCss(processedTokens));
  await fs.writeFile(`./semcore/utils/src/themes/${theme}.json`, tokensToJson(processedTokens));

  const usages: { [tokenName: string]: string[] } = {};
  if (theme === defaultTheme) {
    await fs.writeFile('./semcore/utils/src/themes/default.css', tokensToCss(processedTokens));
    await fs.writeFile('./semcore/utils/src/themes/default.json', tokensToJson(processedTokens));

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

    const usedVariables = {};

    const legacyCssVariablesFile = await fs.readFile('./semcore/utils/style/var.css', 'utf-8');
    const legacyCssVariablesList = legacyCssVariablesFile
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('--') && line.includes(':'))
      .map((line) => line.substring(0, line.indexOf(':')));
    const legacyCssVariables = Object.fromEntries(
      legacyCssVariablesList.map((variableName) => [variableName, 0]),
    );
    const colorLiterals: { path: string; name: string }[] = [];

    const processedCss = await Promise.all(
      projectCssContents.map((cssContent, fileIndex) =>
        postcss([
          {
            postcssPlugin: 'variables-explored',
            prepare: (result) => {
              const traverseAst = (nodes) => {
                for (const node of nodes) {
                  if (node.nodes) {
                    traverseAst(node.nodes);
                  }
                  if (node.value) {
                    const valueAst = valuesParser(node.value);
                    const traverseValueAst = (nodes, parent) => {
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
                            const location =
                              node.source.start.line + ':' + node.source.start.offset;
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
                            const location =
                              node.source.start.line + ':' + node.source.start.offset;
                            colorLiterals.push({
                              path: `${projectCssPaths[fileIndex]}:${location}`,
                              name: valueNode.value,
                            });
                          }
                        }
                        if (valueNode.type !== 'function' || valueNode.value !== 'var') continue;
                        const variableName = valueNode.nodes[0].value;
                        if (!variableName.startsWith(`--${prefix}`)) {
                          if (legacyCssVariables[variableName] !== undefined) {
                            legacyCssVariables[variableName]++;
                          }
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
      projectCssPaths.map((path, index) => fs.writeFile(path, processedCss[index].css)),
    );

    const unusedVariables: string[] = [];
    for (const variable in values) {
      if (!usedVariables[variable]) {
        unusedVariables.push(variable);
      }
    }

    /* eslint-disable no-console */
    if (warning) {
      if (unusedVariables.length > 0) {
        console.log(`Unused design tokens:`);
        console.log(unusedVariables.join('\n'));
      }
      if (Object.values(legacyCssVariables).reduce((sum, item) => sum + item) > 0) {
        console.log(`Still used legacy variables:`);
        for (const variable in legacyCssVariables) {
          if (legacyCssVariables[variable] !== 0) {
            console.log(`${variable} (${legacyCssVariables[variable]})`);
          }
        }
      }
      if (colorLiterals.length > 0) {
        console.log(`Unexpected color literals:`);
        for (const literal of colorLiterals) {
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

    const baseTokensDocumentation: {
      name: string;
      value: string;
      description: string;
    }[] = [];

    for (const group in base) {
      for (const index in base[group]) {
        baseTokensDocumentation.push({
          name: `--${group}-${index}`,
          value: base[group][index].value,
          description: base[group][index].description,
        });
      }
    }

    await fs.writeFile(
      resolvePath(
        dirname,
        '../../../website/docs/style/design-tokens/components/design-tokens.json',
      ),
      JSON.stringify(designTokensDocumentation, null, 2) + '\n',
    );
    await fs.writeFile(
      resolvePath(dirname, '../../../website/docs/style/design-tokens/components/base-tokens.json'),
      JSON.stringify(baseTokensDocumentation, null, 2) + '\n',
    );
  }
}

execSync(`pnpm pretty-quick --pattern "**/*.css"`, {
  encoding: 'utf-8',
  cwd: resolvePath(dirname, '../../../'),
  stdio: ['inherit', 'inherit', 'inherit'],
});

execSync(
  `pnpm eslint --fix --no-ignore -c .eslintrc --ext .json "./semcore/utils/src/themes/default.json" "./website/docs/style/design-tokens/components/design-tokens.json" "./website/docs/style/design-tokens/components/base-tokens.json"`,
  {
    encoding: 'utf-8',
    cwd: resolvePath(dirname, '../../../'),
    stdio: ['inherit', 'inherit', 'inherit'],
  },
);
