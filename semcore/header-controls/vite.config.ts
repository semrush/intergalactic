import copy from 'rollup-plugin-copy';
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
          /@babel\/runtime\/*/,
          /@semcore\/*/,
        ],
        plugins: [
          // @ts-ignore
          copy({
            targets: [
              { src: 'src/theme/**/*.css', dest: 'lib/esm' },
            ],
            flatten: false,
          }),
        ],
      },
    },
  }),
);
