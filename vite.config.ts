/**
 * Configuration for storybook only!
 * See build configuration in the component package folder.
 */

import { defineConfig } from 'vite';
import { createUnplugin } from 'unplugin';
import { resolveSemcoreSources } from './website/docs/.vitepress/resolve-semcore-sources';
import { loadSemcoreSources } from './website/docs/.vitepress/load-semcore-sources';
import pluginReact from '@vitejs/plugin-react';
import { unpluginIcons } from './website/docs/.vitepress/unplugins/unplugin-icons';
import { resolve as resolvePath } from 'path';
import {unpluginIllustrations} from './website/docs/.vitepress/unplugins/unplugin-illustrations';

export default defineConfig({
  plugins: [
    pluginReact({
      babel: {
        plugins: ['@babel/plugin-syntax-import-assertions'],
      },
    }),
    createUnplugin<{}>(() => ({
      name: 'semcore-resolve',
      async resolveId(id) {
        if (
          !id.includes('@semcore') &&
          !id.includes('/semcore/') &&
          !id.startsWith('intergalactic/')
        )
          return null;
        if (id.endsWith('.md') || id.endsWith('.mdx') || id.includes('stories')) return null;
        return await resolveSemcoreSources(id);
      },
      loadInclude: (id) => {
        return id.includes('/semcore/') || id.includes('stories/');
      },
      async load(id) {
        return await loadSemcoreSources(id);
      },
      enforce: 'pre',
    })).vite({}),
    unpluginIcons.vite({}),
    unpluginIllustrations.vite({}),
    createUnplugin<{}>(() => ({
      name: 'docs-components-resolver',
      async resolveId(id) {
        if (!id.startsWith('@components/')) return null;
        const purePath = id.substring('@components/'.length);
        return `${resolvePath(__dirname, 'website', 'src', 'docs-components', purePath)}.jsx`;
      },
    })).vite({}),
  ],
});
