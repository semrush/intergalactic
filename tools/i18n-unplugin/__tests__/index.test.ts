import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, describe, beforeEach, afterEach } from '../../testing-utils/vitest';
import { intergalacticI18nVitePlugin } from '../src/index';

type Options = Parameters<typeof intergalacticI18nVitePlugin>[0];

const callLoad = async (options: Options, id: string): Promise<string> => {
  const plugin: any = intergalacticI18nVitePlugin(options);
  const result = await plugin.load(id);

  return result.code;
};

describe('i18n-unplugin', () => {
  let tempDir: string;
  let localesDir: string;
  let id: string;

  const createFiles = (...filenames: string[]) => {
    for (const filename of filenames) {
      writeFileSync(join(localesDir, filename), '');
    }
  };

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'i18n-unplugin-'));

    localesDir = join(tempDir, 'node_modules', '@semcore', 'some-component', 'translations');
    mkdirSync(localesDir, { recursive: true });
    id = join(localesDir, '__intergalactic-dynamic-locales.mjs');
    createFiles('__intergalactic-dynamic-locales.mjs');
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  describe('locale file resolution', (test) => {
    test('Verify .json files are imported with .json extension', async () => {
      createFiles('en.json', 'de.json');

      const code = await callLoad({}, id);

      expect(code).toContain('import en from "./en.json";');
      expect(code).toContain(`["de"]: () => import('./de.json')`);
    });

    test('Verify .json.mjs files are imported with .json.mjs extension', async () => {
      createFiles('en.json.mjs', 'de.json.mjs');

      const code = await callLoad({}, id);

      expect(code).toContain('import en from "./en.json.mjs";');
      expect(code).toContain(`["de"]: () => import('./de.json.mjs')`);
      expect(code).not.toContain('"./en.json"');
      expect(code).not.toContain(`'./de.json'`);
    });

    test('Verify .json.mjs takes precedence over .json regardless of file order', async () => {
      createFiles('en.json', 'en.json.mjs', 'de.json.mjs', 'de.json');

      const code = await callLoad({}, id);

      expect(code).toContain('import en from "./en.json.mjs";');
      expect(code).toContain(`["de"]: () => import('./de.json.mjs')`);
      expect(code).not.toContain('"./en.json"');
      expect(code).not.toContain(`'./de.json'`);
    });

    test('Verify mixed .json and .json.mjs locales are resolved per locale', async () => {
      createFiles('en.json.mjs', 'de.json', 'fr.json.mjs');

      const code = await callLoad({}, id);

      expect(code).toContain('import en from "./en.json.mjs";');
      expect(code).toContain(`["de"]: () => import('./de.json')`);
      expect(code).toContain(`["fr"]: () => import('./fr.json.mjs')`);
    });

    test('Verify non-locale files are ignored', async () => {
      createFiles('en.json.mjs', 'de.json.mjs', 'index.js', 'readme.md');

      const code = await callLoad({}, id);

      expect(code).not.toContain('index');
      expect(code).not.toContain('readme');
      expect(code).not.toContain('__intergalactic-dynamic-locales');
    });
  });

  describe('options with .json.mjs files', (test) => {
    beforeEach(() => {
      createFiles('en.json.mjs', 'de.json.mjs', 'fr.json.mjs');
    });

    test('Verify bundleLocales imports chosen locales synchronously with .json.mjs', async () => {
      const code = await callLoad({ bundleLocales: ['en', 'de'] }, id);

      expect(code).toContain('import en from "./en.json.mjs";');
      expect(code).toContain('import de from "./de.json.mjs";');
      expect(code).toContain(`["fr"]: () => import('./fr.json.mjs')`);
    });

    test('Verify includeLocales resolves only included locales with .json.mjs', async () => {
      const code = await callLoad({ includeLocales: ['en', 'fr'] }, id);

      expect(code).toContain('import en from "./en.json.mjs";');
      expect(code).toContain(`["fr"]: () => import('./fr.json.mjs')`);
      expect(code).not.toContain('de.json');
    });

    test('Verify excludeLocales removes locales with .json.mjs', async () => {
      const code = await callLoad({ excludeLocales: ['de'] }, id);

      expect(code).toContain('import en from "./en.json.mjs";');
      expect(code).toContain(`["fr"]: () => import('./fr.json.mjs')`);
      expect(code).not.toContain('de.json');
    });

    test('Verify requested locale presence is checked against .json.mjs files', async () => {
      await expect(callLoad({ includeLocales: ['en', 'es'] }, id)).rejects.toThrow(
        'Requested locale es was not found',
      );
    });
  });
});
