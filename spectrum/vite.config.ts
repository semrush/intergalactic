import { unpluginSemcoreResolve } from '@semcore/builder/plugins';
import copy from 'rollup-plugin-copy';
import { defineConfig, mergeConfig } from 'vite';

import viteConfig from '../commonVite.config';

export default defineConfig({
  esbuild: {
    legalComments: 'inline',
  },
  build: {
    minify: false,
    emptyOutDir: true,
    outDir: 'lib',
    lib: {
      entry: {
        'base-trigger': './src/base-trigger/index.ts',
        'button': './src/button/index.ts',
        'dropdown-menu': './src/dropdown-menu/index.ts',
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`,
    },
    rollupOptions: {
      treeshake: false,
      external: ['react', 'react-dom', 'react/jsx-runtime', /@babel\/runtime\/*/, /@semcore\/*/],
    },
  },
});
