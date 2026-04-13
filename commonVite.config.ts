import copy from 'rollup-plugin-copy';
import { createUnplugin } from 'unplugin';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

import { loadSemcoreSources } from './website/docs/.vitepress/load-semcore-sources';
import { resolveSemcoreSources } from './website/docs/.vitepress/resolve-semcore-sources';

export default defineConfig({
  plugins: [
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
    minify: false,
    emptyOutDir: false,
    outDir: 'lib',
    rollupOptions: {
      treeshake: false,
      external: ['react', 'react-dom', 'react/jsx-runtime', /@babel\/runtime\/*/, /@semcore\/*/],
      output: [
        {
          preserveModules: true,
          assetFileNames: 'esm/[name][extname]',
          entryFileNames: 'esm/[name].mjs',
          format: 'esm',
        },
      ],
      plugins: [
        // @ts-ignore
        copy({
          targets: [
            { src: 'src/**/*.shadow.css', dest: 'lib/esm' },
          ],
          flatten: false,
        }),
      ],
    },
  },
}) as UserConfig;
