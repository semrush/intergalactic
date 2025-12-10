// @ts-ignore
import reshadowUtils from '@reshadow/utils';
import type { UnpluginInstance } from 'unplugin';
import { createUnplugin } from 'unplugin';

const REGEXPS = {
  RESHADOW_STYLES: /\/\*!__reshadow-styles__:"(.*?)"\*\//g,
  RESHADOW_CSS: /\/\*__reshadow_css_start__\*\/([\s\S]*?),( ?)(\n?)\/\*__reshadow_css_end__\*\//g,
  INNER_CSS: /__inner_css_start__\*\/([\s\S]*?),(\n?)\s*\/\*__inner_css_end__/,
  ES6_IMPORT: /^import /m,
} as const;

const generateHashedFilePath = (path: string, code: string, prefix?: string): string => {
  const hash = `${reshadowUtils.getFileHash(path)}_${reshadowUtils.getFileHash(code)}`;
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

type Options = {
  prefix?: string;
};

export const intergalacticCssVirtualizerUnplugin = createUnplugin<Options>((options = {}) => {
  const { prefix } = options;
  const cssFiles = new Map<string, string>();

  return {
    name: 'intergalactic-css-virtualizer-unplugin',
    enforce: 'pre',

    resolveId(id) {
      return cssFiles.has(id) ? id : null;
    },

    loadInclude(id) {
      return id.endsWith('.css');
    },

    load(id) {
      return cssFiles.get(id) ?? null;
    },

    transformInclude(id) {
      return id.includes('@semcore/');
    },

    transform(source, id) {
      const importPaths: string[] = [];
      const isES6Mode = REGEXPS.ES6_IMPORT.test(source);

      const transformedCode = source.replace(
        REGEXPS.RESHADOW_CSS,
        (_, codeBlock: string) => {
          const css = extractCssFromCode(codeBlock);

          const hashedFilePath = generateHashedFilePath(id, css, prefix);
          cssFiles.set(hashedFilePath, css);
          importPaths.push(hashedFilePath);

          return id.includes('@semcore/flags') || !isES6Mode ? 'undefined, ' : '(undefined, ';
        },
      ).replace(REGEXPS.RESHADOW_STYLES, () =>
        createImportStatement(importPaths.shift()!, isES6Mode),
      );

      return { code: transformedCode };
    },
  };
});

export const intergalacticCssVirtualizerVitePlugin: UnpluginInstance<Options>['vite'] = intergalacticCssVirtualizerUnplugin.vite;
export const intergalacticCssVirtualizerWebpackPlugin: UnpluginInstance<Options>['webpack'] = intergalacticCssVirtualizerUnplugin.webpack;
