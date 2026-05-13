import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { resolve as resolvePath, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import glob from 'fast-glob';
import postcss from 'postcss';
import valuesParser from 'postcss-value-parser';

import { toPandaPreset } from './panda-processor.ts';
import { theme as config } from './theme.ts';
import type { Token } from './utils.ts';
import { logger, processTokens, tokensToCss, tokensToJs } from './utils.ts';

export const writeIfChanged = async (relativePath: string, content: string) => {
  const pathToFile = resolvePath(packageDirname, relativePath);
  try {
    const originalContent = await fs.readFile(pathToFile, 'utf-8');
    if (originalContent.replace(/[\s\n]/g, '') === content.replace(/[\s\n]/g, '')) {
      return;
    }
  } catch (err: unknown) {
    if (!(err instanceof Error) || !('code' in err) || err.code !== 'ENOENT' || !err.message.startsWith('ENOENT: no such file')) {
      throw err;
    }
  }
  const dirName = dirname(pathToFile);
  await fs.mkdir(dirName, { recursive: true });
  await fs.writeFile(pathToFile, content);
};

const PREFIX = 'intergalactic';
const defaultTheme = 'light';
const themes = ['light', 'dark'];

const warning = !process.argv.includes('--no-warning');

const packageDirname = resolvePath(fileURLToPath(import.meta.url), '..', '..');
const semcorePath = resolvePath(packageDirname, '..', '..', 'semcore');

const { baseTokens, semanticTokens, highlightsTokens } = processTokens(
  config,
  PREFIX,
);

for (const theme of themes) {
  await writeIfChanged(
    `lib/${theme}.css`,
    tokensToCss([...baseTokens, ...semanticTokens]),
  );
  await writeIfChanged(`lib/${theme}.ts`, tokensToJs([...baseTokens, ...semanticTokens]));
  await writeIfChanged(`lib/${theme}.js`, tokensToJs([...baseTokens, ...semanticTokens]));

  if (highlightsTokens.length > 0) {
    await writeIfChanged(
      `lib/highlights-${theme}.css`,
      tokensToCss(highlightsTokens),
    );
    await writeIfChanged(`lib/highlights-${theme}.ts`, tokensToJs(highlightsTokens));
    await writeIfChanged(`lib/highlights-${theme}.js`, tokensToJs(highlightsTokens));
  }

  if (theme === defaultTheme) {
    const pandaPreset = toPandaPreset(config);

    await writeIfChanged('lib/panda-preset.js', pandaPreset);
    await writeIfChanged('lib/panda-preset.ts', pandaPreset);

    const usages = await processStyles();

    await processTokensToDocs(usages, {
      basic: baseTokens,
      semantic: semanticTokens,
      highlight: highlightsTokens,
    });
  }
}

export async function processStyles() {
  const usages: Record<string, string[]> = {};

  const commonValues = await import('../lib/light.ts').then((res) => res.default);
  const highlightValues = await import('../lib/highlights-light.ts').then((res) => res.default);

  const values = {
    ...commonValues,
    ...highlightValues,
  };

  const projectCssPaths = (
    await glob(['./*/src/**/*.shadow.css', './*/src/**/*mixin.css'], {
      ignore: ['node_modules', 'lib'],
      cwd: semcorePath,
    })
  ).filter((path) => {
    if (path.split('/').some((pathPart) => ['theme', 'chart', 'email', 'table'].includes(pathPart))) {
      return false;
    }
    return true;
  });

  const projectCssContents = await Promise.all(
    projectCssPaths.map((path) => fs.readFile(resolvePath(semcorePath, path), 'utf-8')),
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
                      if (!variableName.startsWith(`--${PREFIX}`)) {
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
                      const withoutPrefix = variableName.substring(`--${PREFIX}-`.length);
                      usedVariables[withoutPrefix] = true;
                      // @ts-ignore
                      if (!values[variableName] && !withoutPrefix) {
                        throw new Error(
                          `Variable ${variableName} is used in project but not presented in design tokens list`,
                        );
                      }
                      valueNode.nodes[2].type = 'word';
                      // @ts-ignore
                      valueNode.nodes[2].value = values[variableName];
                      valueNode.nodes[2].nodes = [];
                      valueNode.nodes.length = 3;
                      usages[variableName] = usages[variableName] ?? [];
                      usages[variableName].push(projectCssPaths[fileIndex]);
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
    projectCssPaths.map((path, index) => writeIfChanged(resolvePath(semcorePath, path), processedCss[index].css)),
  );

  const unusedVariables: string[] = [];
  for (const variable in values) {
    if (!usedVariables[variable]) {
      unusedVariables.push(variable);
    }
  }

  if (warning) {
    if (unusedVariables.length > 0) {
      logger.log('Unused design tokens:');
      logger.log(unusedVariables.join('\n'));
    }
    if (colorLiterals.length > 0) {
      logger.log('Unexpected color literals:');
      for (const literal of colorLiterals) {
        logger.log(`${literal.name} in ${literal.path}`);
      }
    }
  }

  return usages;
}

async function processTokensToDocs(usages: Record<string, string[]>, tokens: { basic: Token[]; semantic: Token[]; highlight: Token[] }) {
  const baseTokensDocumentation: Token[] = tokens.basic;

  const designTokensDocumentation: {
    name: string;
    value: string;
    description: string;
    components: string[];
  }[] = [];

  for (const processedToken of [...tokens.semantic, ...tokens.highlight]) {
    const { name, value, description } = processedToken;

    const components = [
      ...new Set((usages[name] ?? []).map((cssPath) => cssPath.split('/')[0])),
    ];
    components.sort((a, b) => a.localeCompare(b));

    designTokensDocumentation.push({
      name,
      value: value,
      description: description,
      components,
    });
  }

  await writeIfChanged(
    resolvePath(packageDirname, '../../website/docs/style/design-tokens/design-tokens.json'),
    JSON.stringify(designTokensDocumentation, null, 2) + '\n',
  );
  await writeIfChanged(
    resolvePath(packageDirname, '../../website/docs/style/design-tokens/base-tokens.json'),
    JSON.stringify(baseTokensDocumentation, null, 2) + '\n',
  );
}

execSync('pnpm lint:css --fix', {
  encoding: 'utf-8',
  cwd: resolvePath(packageDirname, '../../'),
  stdio: ['inherit', 'inherit', 'inherit'],
});
