import { glob } from 'glob';
import { defineConfig, mergeConfig } from 'vite';

import viteConfig from '../../commonVite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      lib: {
        entry: glob.sync('src/**/*.{ts,tsx}', {
          ignore: ['lib/**/*.d.ts'],
        }),
      },
      rollupOptions: {
        output: [
          {
            preserveModules: true,
            assetFileNames: '[name][extname]',
            entryFileNames: '[name].mjs',
            format: 'esm',
          },
        ],
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'classnames',
          'colorjs.io',
          '@reshadow/core',
          '@phytonmk/nano-css',
          '@formatjs/intl',
          'hoist-non-react-statics',
          /node_modules/,
          /@babel\/runtime\/*/,
          /@semcore\/*/,
        ],
      },
    },
  }),
);
