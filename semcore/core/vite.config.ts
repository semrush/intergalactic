import { defineConfig, mergeConfig } from 'vite';

import viteConfig from '../../commonVite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      lib: {
        entry: './src/index.ts',
      },
    },
  }),
);
