import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],

  addons: [// '@storybook/addon-storysource',
    '@storybook/addon-links', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: [{ from: '../semcore/utils/src/themes', to: '/assets/core' }, { from: '../tools/theme/lib', to: '/assets/theme' }],
  viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[hash][extname]',
            chunkFileNames: '[hash].js',
            entryFileNames: '[hash].js',
          },
        },
      },
    });
  },
};
export default config;
