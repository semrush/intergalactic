/// <reference types="vitest" />
import { resolve as resolvePath } from 'path';

import AllureReporter from 'allure-vitest/reporter';
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
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
  ],
  resolve: {
    alias: [
      {
        find: /^@semcore\/core\/lib\/utils\/(.*)/,
        replacement: resolvePath(__dirname, 'semcore/core/src/utils/$1'),
      },
      {
        find: /^@semcore\/icon\/(.*)/,
        replacement: resolvePath(__dirname, 'semcore/icon/lib/$1'),
      },
      {
        find: '@semcore/flex-box',
        replacement: resolvePath(__dirname, 'semcore/base-components/src/components/flex-box/index.tsx'),
      },
      {
        find: /^@semcore\/esbuild-plugin-semcore\/(.*)/,
        replacement: resolvePath(__dirname, 'tools/esbuild-plugin-semcore/$1'),
      },
      {
        find: /^@semcore\/testing-utils\/(.*)/,
        replacement: resolvePath(__dirname, 'tools/testing-utils/$1'),
      },
      {
        find: /^@semcore\/([\w-]*)$/,
        replacement: resolvePath(__dirname, 'semcore/$1/src'),
      },
      {
        find: /^intergalactic\/([\w-]*)$/,
        replacement: resolvePath(__dirname, 'semcore/$1/src'),
      },
    ],
  },
  test: {
    testTimeout: 60 * 1000,
    include: [
      'semcore/*/__tests__/**/*.test.tsx',
      'semcore/*/__tests__/**/*.test.jsx',
      'semcore/*/__tests__/**/*.test.ts',
      'semcore/*/__tests__/**/*.test.js',
      'tools/*/__tests__/**/*.test.tsx',
      'tools/*/__tests__/**/*.test.jsx',
      'tools/*/__tests__/**/*.test.ts',
      'tools/*/__tests__/**/*.test.js',
    ],
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
    environment: 'jsdom',
    setupFiles: [resolvePath(__dirname, 'tools/testing-utils/setupTests')],
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
