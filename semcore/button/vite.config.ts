import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

import pkg from './package.json';

const allDeps = Object.keys({
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
});

export default defineConfig({
  plugins: [pluginReact(), libInjectCss(), externalizeDeps()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      external: allDeps,
      output: [
        {
          entryFileNames: '[name].cjs',
          format: 'cjs',
        },
        {
          entryFileNames: '[name].mjs',
          format: 'esm',
        },
        {
          entryFileNames: '[name].js',
          format: 'es',
        },
      ],
    },
  },
});
