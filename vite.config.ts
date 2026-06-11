/**
 * Configuration for storybook only!
 * See build configuration in the component package folder.
 */

import { resolve as resolvePath, dirname } from 'path';
import { fileURLToPath } from 'url';

import { unpluginIcons, unpluginIllustrations, unpluginSemcoreResolve } from '@semcore/builder/plugins';
import pluginReact from '@vitejs/plugin-react';
import { createUnplugin } from 'unplugin';
import { defineConfig } from 'vite';

const rootDir = resolvePath(dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  plugins: [
    pluginReact({
      babel: {
        presets: [
          ['@babel/preset-react', { throwIfNamespace: false }],
          ['@semcore/babel-preset-ui', { cssStyle: { extract: null } }],
        ],
        plugins: ['babel-plugin-transform-import-meta'],
      },
    }),
    // unpluginSemcoreResolve.vite({ rootPath: rootDir }),
    unpluginIcons.vite({ rootPath: rootDir }),
    unpluginIllustrations.vite({ rootPath: rootDir }),
    createUnplugin<{}>(() => ({
      name: 'docs-components-resolver',
      async resolveId(id) {
        if (!id.startsWith('@components/')) return null;
        const purePath = id.substring('@components/'.length);
        return `${resolvePath(__dirname, 'website', 'src', 'docs-components', purePath)}.jsx`;
      },
    })).vite({}),
  ],
  resolve: {
    alias: [
      {
        find: /^@semcore\/core\/lib\/utils\/(.*)/,
        replacement: resolvePath(__dirname, 'semcore/core/src/utils/$1'),
      },
      {
        find: /^@semcore\/ui\/core\/lib\/utils\/(.*)/,
        replacement: resolvePath(__dirname, 'semcore/core/src/utils/$1'),
      },
      {
        find: /^@semcore\/theme\/lib\/(.*)/,
        replacement: resolvePath(__dirname, 'tools/theme/lib/$1'),
      },
      {
        find: /^@semcore\/theme\/(.*)/,
        replacement: resolvePath(__dirname, 'tools/theme/lib/$1'),
      },
      {
        find: /^@semcore\/icon\/(.*)/,
        replacement: resolvePath(__dirname, 'semcore/icon/lib/$1'),
      },
      {
        find: /^@semcore\/illustration\/(.*)/,
        replacement: resolvePath(__dirname, 'semcore/illustration/lib/$1'),
      },
      {
        find: /^@semcore\/ui\/([\w-]*)$/,
        replacement: resolvePath(__dirname, 'semcore/$1/src'),
      },
      {
        find: /^@semcore\/([\w-]*)$/,
        replacement: resolvePath(__dirname, 'semcore/$1/src'),
      },
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
    },
  },
});
