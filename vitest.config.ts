/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        presets: [
          ['@babel/preset-react', { throwIfNamespace: false }],
          [
            '@semcore/babel-preset-ui',
            {
              cssStyle: {
                extract: null,
              },
            },
          ],
        ],
        plugins: ['babel-plugin-transform-import-meta'],
      },
      filter: /\.(j|t)sx?$/,
    }),
  ],
  test: {
    testTimeout: 10 * 1000,
    include: ['semcore/*/__tests__/**/*.tsx'],
    exclude: [
      'tools/code-mod',
      'tools/generator-component',
      'tools/icon-transform-svg',
      'tools/babel-plugin-shadow',
      'tools/babel-plugin-recharts',
      'semcore/chart',
      'semcore/ui',
      'semcore/input-mask',
      'tools/babel-plugin-react-semcore',
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
    ],
    environment: 'happy-dom',
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
      toHaveNoViolations(): R;
    }
  }
}
