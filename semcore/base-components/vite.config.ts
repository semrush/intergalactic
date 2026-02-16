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
        // output: [
        //   {
        //     preserveModules: true,
        //     preserveModulesRoot: 'src',
        //     assetFileNames: 'esm/[name][extname]',
        //     entryFileNames: 'esm/[name].mjs',
        //     format: 'esm',
        //   },
        // ],
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          /@babel\/runtime\/*/,
          /@semcore\/*/,
          'classnames',
          'csstype',
          '@floating-ui/dom',
          '@popperjs/core',
          'popper-max-size-modifier',
        ],
      },
    },
  }),
);
