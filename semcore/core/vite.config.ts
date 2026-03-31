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
        treeshake: false,
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          /@babel\/runtime\/*/,
          /@semcore\/*/,

          '@formatjs/intl',
          'classnames',
          'hoist-non-react-statics',
          '@phytonmk/nano-css',
        ],
        output: [
          {
            preserveModules: true,
            assetFileNames: '[name][extname]',
            entryFileNames: '[name].mjs',
            format: 'esm',
          },
        ],
      },
    },
  }),
);
