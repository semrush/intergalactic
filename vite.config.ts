/**
 * Configuration for storybook only!
 * See build configuration in the component package folder.
 */

import { resolve as resolvePath } from 'path';

import { unpluginSemcoreResolve } from '@semcore/builder/plugins';
import pluginReact from '@vitejs/plugin-react';
import { createUnplugin } from 'unplugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    pluginReact({
      babel: {
        plugins: ['@babel/plugin-syntax-import-assertions'],
      },
    }),
    unpluginSemcoreResolve.vite({}),
    createUnplugin<{}>(() => ({
      name: 'docs-components-resolver',
      async resolveId(id) {
        if (!id.startsWith('@components/')) return null;
        const purePath = id.substring('@components/'.length);
        return `${resolvePath(__dirname, 'website', 'src', 'docs-components', purePath)}.jsx`;
      },
    })).vite({}),
  ],
  build: {
    rollupOptions: {
      external: [
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
    },
  },
});
