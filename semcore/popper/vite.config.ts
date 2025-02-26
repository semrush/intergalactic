import { defineConfig, mergeConfig } from 'vite';

import viteConfig from '../../commonVite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      lib: {
        entry: './src/index.ts',
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          '@popperjs/core',
          'popper-max-size-modifier',
          /@babel\/runtime\/*/,
          /@semcore\/*/,
        ],
      },
    },
  }),
);
