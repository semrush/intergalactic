import { createUnplugin, UnpluginInstance } from 'unplugin';
import fs from 'fs/promises';
import path from 'path';

type Options = {
  bundleLocales?: string[];
  includeLocales?: string[];
  excludeLocales?: string[];
};

export const intergalacticI18nUnplugin: UnpluginInstance<Options> = createUnplugin(
  (options: Options) => {
    return {
      name: 'semcore-i18n-unplugin',
      loadInclude(id) {
        return (
          (id.includes('/@semcore/') || id.includes('/intergalactic/')) &&
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
        for (const locale of options?.bundleLocales ?? []) {
          if (options?.excludeLocales?.includes(locale)) {
            throw new Error(
              `Locale "${locale}" is mentioned in "bundleLocales" but excluded with "excludeLocales". Bundled locales might not be excluded.`,
            );
          }
          if (options.includeLocales && !options.includeLocales.includes(locale)) {
            throw new Error(
              `Locale "${locale}" is mentioned in "bundleLocales" but not included with "includeLocales". Bundled locales must be included.`,
            );
          }
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
        const prefix = 'export const localizedMessages = {';
        const loaders = asyncLocales.map(
          (locale) => `["${locale}"]: () => import('./${locale}.json')`,
        );

        const postfix = '};';

        const code = `${imports}\n\n${prefix}\n${[...syncLocales, ...loaders].join(
          ',\n',
        )}${postfix}`;

        return { code };
      },
    };
  },
);

export const intergalacticI18nVitePlugin: UnpluginInstance<Options>['vite'] =
  intergalacticI18nUnplugin.vite;
export const intergalacticI18nRollupPlugin: UnpluginInstance<Options>['rollup'] =
  intergalacticI18nUnplugin.rollup;
export const intergalacticI18nWebpackPlugin: UnpluginInstance<Options>['webpack'] =
  intergalacticI18nUnplugin.webpack;
export const intergalacticI18nEsbuildPlugin: UnpluginInstance<Options>['esbuild'] =
  intergalacticI18nUnplugin.esbuild;

/**
 * @deprecated
 * Please use `intergalacticI18nUnplugin` instead.
 */
export const semcoreI18nUnplugin: UnpluginInstance<Options> = intergalacticI18nUnplugin;
/**
 * @deprecated
 * Please use `intergalacticI18nVitePlugin` instead.
 */
export const semcoreI18nVitePlugin: UnpluginInstance<Options>['vite'] = intergalacticI18nVitePlugin;
/**
 * @deprecated
 * Please use `intergalacticI18nRollupPlugin` instead.
 */
export const semcoreI18nRollupPlugin: UnpluginInstance<Options>['rollup'] =
  intergalacticI18nRollupPlugin;
/**
 * @deprecated
 * Please use `intergalacticI18nWebpackPlugin` instead.
 */
export const semcoreI18nWebpackPlugin: UnpluginInstance<Options>['webpack'] =
  intergalacticI18nWebpackPlugin;
/**
 * @deprecated
 * Please use `intergalacticI18nEsbuildPlugin` instead.
 */
export const semcoreI18nEsbuildPlugin: UnpluginInstance<Options>['esbuild'] =
  intergalacticI18nEsbuildPlugin;
