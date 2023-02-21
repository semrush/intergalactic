import { createUnplugin, UnpluginInstance } from 'unplugin';
import fs from 'fs/promises';
import path from 'path';

type Options = {
  bundleLocales?: string[];
  includeLocales?: string[];
  excludeLocales?: string[];
};

export const semcoreI18nUnplugin: UnpluginInstance<Options> = createUnplugin((options: Options) => {
  return {
    name: 'semcore-i18n-unplugin',
    loadInclude(id) {
      return (
        id.includes('/@semcore/') &&
        (id.endsWith('/__intergalactic-dynamic-locales.ts') ||
          id.endsWith('/__intergalactic-dynamic-locales.js') ||
          id.endsWith('/__intergalactic-dynamic-locales.cjs') ||
          id.endsWith('/__intergalactic-dynamic-locales.mjs'))
      );
    },
    async load(id) {
      const sameDirFiles: string[] = await fs.readdir(path.dirname(id));
      const allLocales = sameDirFiles
        .filter((filename) => filename.endsWith('.json'))
        .map((filename) => filename.substring(0, filename.length - '.json'.length));

      if (options?.bundleLocales?.length === 0) {
        throw new Error(`At least one locale should be mentioned in "bundleLocales" list.`);
      }

      if (options?.includeLocales || options?.bundleLocales) {
        for (const locale of [
          ...(options?.includeLocales ?? []),
          ...(options?.bundleLocales ?? []),
        ]) {
          if (!allLocales.includes(locale)) {
            throw new Error(`Requested locale ${locale} was not found in "${path.dirname(id)}"`);
          }
        }
      }
      const filteredLocales = options.includeLocales
        ? options.includeLocales
        : allLocales.filter((locale) => !options?.excludeLocales?.includes(locale));
      const syncLocales = filteredLocales.filter((locale) =>
        (options?.bundleLocales ?? ['en']).includes(locale),
      );
      const asyncLocales = filteredLocales.filter((locale) => !syncLocales.includes(locale));

      const imports = syncLocales
        .map((locale) => `import ${locale} from "./${locale}.json";`)
        .join('\n');
      const prefix = `export const localizedMessages = {`;
      const loaders = asyncLocales.map(
        (locale) => `["${locale}"]: () => import('./${locale}.json')`,
      );

      const postfix = `};`;

      const code = `${imports}\n\n${prefix}\n${[...syncLocales, ...loaders].join(',\n')}${postfix}`;

      return { code };
    },
  };
});

export const semcoreI18nVitePlugin: UnpluginInstance<Options>['vite'] = semcoreI18nUnplugin.vite;
export const semcoreI18nRollupPlugin: UnpluginInstance<Options>['rollup'] =
  semcoreI18nUnplugin.rollup;
export const semcoreI18nWebpackPlugin: UnpluginInstance<Options>['webpack'] =
  semcoreI18nUnplugin.webpack;
export const semcoreI18nEsbuildPlugin: UnpluginInstance<Options>['esbuild'] =
  semcoreI18nUnplugin.esbuild;
