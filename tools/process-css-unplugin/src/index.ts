import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import stringHash from 'string-hash';
import type { UnpluginInstance } from 'unplugin';
import { createUnplugin } from 'unplugin';

const ISOLUTION_SUFFIX = '_gg_';
const REGEXPS = {
  RESHADOW_STYLES: /\/\*!__reshadow-styles__:"(.*?)"\*\//g,
  RESHADOW_CSS: /\/\*__reshadow_css_start__\*\/([\s\S]*?),( ?)(\n?)\/\*__reshadow_css_end__\*\//g,
  INNER_CSS: /__inner_css_start__\*\/([\s\S]*?),(\n?)\s*\/\*__inner_css_end__/,
  ES6_IMPORT: /^import /m,
} as const;

const generateHashedFilePath = (code: string, prefix?: string): string => {
  const hash = stringHash(code);
  return prefix ? `${prefix}_${hash}.css` : `${hash}.css`;
};

const extractCssFromCode = (code: string): string => {
  const match = code.match(REGEXPS.INNER_CSS) ?? [];

  const [, css] = match;

  if (!css) return '';

  return css
    .trim()
    .replace(/,$/, '')
    .replace(/^[`'"]([\s\S]*?)[`'"]$/, '$1');
};

const createImportStatement = (path: string, isES6: boolean): string => {
  return isES6 ? `import '${path}';` : `require('${path}');`;
};

const replaceIsolationSuffix = (content: string, newSuffix: string): string => {
  const suffixRegex = new RegExp(ISOLUTION_SUFFIX, 'g');

  return content.replace(suffixRegex, newSuffix);
};

const writeCssFile = (dir: string, fileName: string, css: string): string => {
  const filePath = join(dir, fileName).replace(/\\/g, '/');

  if (!existsSync(filePath)) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, css);
  }

  return filePath;
};

type Options = {
  virtualFilesPrefix?: string;
  isolationSuffix?: string;
};

const processCssUnplugin = createUnplugin<Options>((options = {}) => {
  const { virtualFilesPrefix, isolationSuffix } = options;
  const cssFiles = new Map<string, string>();

  let cssDir: string | undefined;

  const transformInclude = (id: string): boolean => id.includes('@semcore/');

  const transform = (source: string, id: string) => {
    const importPaths: string[] = [];
    const isES6Mode = REGEXPS.ES6_IMPORT.test(source);

    let transformedCode = source.replace(
      REGEXPS.RESHADOW_CSS,
      (_, codeBlock: string) => {
        let css = extractCssFromCode(codeBlock);

        if (isolationSuffix) {
          css = replaceIsolationSuffix(css, isolationSuffix);
        }

        const hashedFilePath = generateHashedFilePath(css, virtualFilesPrefix);

        if (cssDir) {
          importPaths.push(writeCssFile(cssDir, hashedFilePath, css));
        } else {
          cssFiles.set(hashedFilePath, css);
          importPaths.push(hashedFilePath);
        }

        return id.includes('@semcore/flags') || !isES6Mode ? 'undefined, ' : '(undefined, ';
      },
    ).replace(REGEXPS.RESHADOW_STYLES, () =>
      createImportStatement(importPaths.shift()!, isES6Mode),
    );

    if (isolationSuffix) {
      transformedCode = replaceIsolationSuffix(transformedCode, isolationSuffix);
    }

    return { code: transformedCode };
  };

  return {
    name: 'semcore-process-css-unplugin',
    enforce: 'pre',

    resolveId(id) {
      return cssFiles.has(id) ? id : null;
    },

    loadInclude(id) {
      return cssFiles.has(id);
    },

    load(id) {
      return cssFiles.get(id) ?? null;
    },

    transformInclude,

    transform,

    vite: {
      config() {
        const isRolldown = Boolean(this?.meta && 'rolldownVersion' in this.meta);

        if (isRolldown) {
          return {
            optimizeDeps: {
              rolldownOptions: {
                plugins: [
                  {
                    name: 'semcore-process-css-unplugin:deps',
                    transform(source: string, id: string) {
                      return transformInclude(id) ? transform(source, id) : null;
                    },
                  },
                ],
              },
            },
          };
        }

        return {
          optimizeDeps: {
            esbuildOptions: {
              plugins: [{
                name: 'semcore-process-css-unplugin:deps',
                setup(build) {
                  build.onLoad({ filter: /@semcore[\\/].*\.[cm]?js$/ }, async ({ path }) => {
                    const source = await readFile(path, 'utf-8');

                    return {
                      contents: transform(source, path.replace(/\\/g, '/')).code,
                      loader: 'js',
                    };
                  });
                },
              }],
            },
          },
        };
      },

      configResolved(config) {
        cssDir = join(config.cacheDir, 'semcore-css');
      },
    },
  };
});

export const processCssVitePlugin: UnpluginInstance<Options>['vite'] = processCssUnplugin.vite;
export const processCssWebpackPlugin: UnpluginInstance<Options>['webpack'] = processCssUnplugin.webpack;
