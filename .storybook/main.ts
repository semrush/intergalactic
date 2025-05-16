import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[hash][extname]',
            chunkFileNames: '[hash].js',
            entryFileNames: '[hash].js'
          }
        }
      }
    })
  }
};
export default config;
