import { defineConfig, mergeConfig } from 'vite';

import viteConfig from '../../commonVite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      lib: {
        entry: './src/index.js',
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          /@babel\/runtime\/*/,
          /@semcore\/*/,
          'd3-array',
          'd3-interpolate',
          'd3-polygon',
          'd3-scale',
          'd3-shape',
          'd3-time',
          'd3-time-format',
          'd3-transition',
          'hoist-non-react-statics',
          '@formatjs/intl',
          '@upsetjs/venn.js',
        ],
      },
    },
  }),
);
