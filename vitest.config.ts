/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // babel: { presets: [['@babel/preset-react', { throwIfNamespace: false, useBuiltIns: true }]] },
    }),
  ],
  test: {
    include: ['semcore/button/__tests__/**/*.tsx'],
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
