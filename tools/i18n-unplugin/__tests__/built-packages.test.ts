import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import { transform } from 'esbuild';

import { expect, describe } from '../../testing-utils/vitest';
import { intergalacticI18nUnplugin } from '../src/index';

const semcoreDir = resolve(__dirname, '../../../semcore');
const dynamicLocalesPattern = /(^|\/)translations\/__intergalactic-dynamic-locales\.m?js$/;

const builtIds = readdirSync(semcoreDir).flatMap((pkg) =>
  ['esm', 'es6', 'cjs']
    .map((format) => join(semcoreDir, pkg, 'lib', format))
    .filter((libDir) => existsSync(libDir))
    .flatMap((libDir) =>
      readdirSync(libDir, { recursive: true, encoding: 'utf8' })
        .filter((file) => dynamicLocalesPattern.test(file))
        .map((file) => join(libDir, file)),
    ),
);

const getLocales = (dir: string) =>
  readdirSync(dir)
    .filter((file) => /\.json(\.mjs)?$/.test(file))
    .map((file) => file.replace(/\.json(\.mjs)?$/, ''))
    .sort();

const toName = (id: string) => id.slice(semcoreDir.length + 1);

describe.skipIf(builtIds.length === 0)('i18n-unplugin with built packages', (test) => {
  test('Verify generated code imports files that exist in every built package', async () => {
    const plugin: any = intergalacticI18nUnplugin.raw({}, { framework: 'vite' });
    const brokenImports: string[] = [];

    for (const id of builtIds) {
      const { code } = await plugin.load(id);

      await transform(code, { loader: 'js', format: 'esm' });

      const importedFiles = [...code.matchAll(/["']\.\/([^"']+)["']/g)].map(([, file]) => file);

      if (importedFiles.length === 0) {
        brokenImports.push(`${toName(id)}: no locales imported`);
      }
      for (const file of importedFiles) {
        if (!existsSync(join(dirname(id), file))) {
          brokenImports.push(`${toName(id)}: ${file} does not exist`);
        }
      }
    }

    expect(brokenImports).toEqual([]);
  });

  test('Verify every built package ships the same locales as its source', () => {
    const missingLocales = builtIds
      .map((id) => {
        const srcDir = dirname(id).replace(/\/lib\/(esm|es6|cjs)\//, '/src/');
        const built = getLocales(dirname(id));
        const source = getLocales(srcDir);

        return built.join() === source.join()
          ? null
          : `${toName(id)}: built [${built}] vs source [${source}]`;
      })
      .filter(Boolean);

    expect(missingLocales).toEqual([]);
  });
});
