import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { createUnplugin } from 'unplugin';
import { resolveSemcoreSources } from './website/docs/.vitepress/resolve-semcore-sources';
import { loadSemcoreSources } from './website/docs/.vitepress/load-semcore-sources';

export default defineConfig({
  plugins: [
    pluginReact(),
    createUnplugin<{}>(() => ({
      name: 'semcore-styles-resolver',
      async resolveId(id) {
        if (!id.endsWith('.shadow.css')) return null;
        return await resolveSemcoreSources(id);
      },
      loadInclude: (id) => {
        return id.includes('/semcore/');
      },
      async load(id) {
        return await loadSemcoreSources(id, true);
      },
      enforce: 'pre',
    })).vite({}),
  ],
  build: {
    emptyOutDir: false,
    minify: false,
    outDir: 'lib',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', /@babel\/runtime\/*/, /@semcore\/*/],
      output: [
        {
          preserveModules: true,
          assetFileNames: 'esm/[name][extname]',
          entryFileNames: 'esm/[name].mjs',
          format: 'esm',
        },
      ],
    },
  },
});
