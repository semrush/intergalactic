import { defineConfig } from 'vite';
import { createUnplugin } from 'unplugin';
import { resolveSemcoreSources } from './website/docs/.vitepress/resolve-semcore-sources';
import { loadSemcoreSources } from './website/docs/.vitepress/load-semcore-sources';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
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
  ],
});
