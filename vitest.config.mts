import { dirname, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import AllureReporter from 'allure-vitest/reporter';
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vitest/config';

const rootDir = resolvePath(dirname(fileURLToPath(import.meta.url)));

export const vitestPlugins = [
  babel({
    babelConfig: {
      presets: [
        ['@babel/preset-react', { throwIfNamespace: false }],
        ['@semcore/babel-preset-ui', { cssStyle: { extract: null } }],
      ],
      plugins: ['babel-plugin-transform-import-meta'],
    },
    filter: /\.(j|t)sx?$/,
  }),
];
export const vitestResolve = {
  alias: [
    {
      find: /^@semcore\/core\/lib\/utils\/(.*)/,
      replacement: resolvePath(rootDir, 'semcore/core/src/utils/$1'),
    },
    {
      find: /^@semcore\/icon\/(.*)/,
      replacement: resolvePath(rootDir, 'semcore/icon/lib/$1'),
    },
    {
      find: /^@semcore\/esbuild-plugin-semcore\/(.*)/,
      replacement: resolvePath(rootDir, 'tools/esbuild-plugin-semcore/$1'),
    },
    {
      find: /^@semcore\/testing-utils\/(.*)/,
      replacement: resolvePath(rootDir, 'tools/testing-utils/$1'),
    },
    {
      find: /^@semcore\/([\w-]*)$/,
      replacement: resolvePath(rootDir, 'semcore/$1/src'),
    },
    {
      find: /^intergalactic\/([\w-]*)$/,
      replacement: resolvePath(rootDir, 'semcore/$1/src'),
    },
  ],
};

export default defineConfig({
  plugins: vitestPlugins,
  resolve: vitestResolve,
  test: {
    projects: [
      'semcore/accordion',
      'semcore/add-filter',
      'semcore/data-table',
      'tools/process-css-unplugin',
    ],
    testTimeout: 60 * 1000,
    exclude: [
      'tools/icon-transform-svg',
      '**/*.d.ts',
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      'tools/*/__tests__/utils.ts',
    ],
    reporters: ['default', new AllureReporter({})],
  },
  define: {
    'globalThis.__intergalacticFlagsBaseUrl': '"https://static.semrush.com/ui-kit/flags/"',
  },
});

declare global {

  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
      toHaveFocus(): R;
      toHaveStyle(style: string): R;
    }
  }
}
