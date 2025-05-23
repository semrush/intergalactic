import { defineConfig, UserConfig } from 'vite';
import { createUnplugin } from 'unplugin';
import { resolveSemcoreSources } from './website/docs/.vitepress/resolve-semcore-sources';
import { loadSemcoreSources } from './website/docs/.vitepress/load-semcore-sources';
import copy from 'rollup-plugin-copy';

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
        })
      ]
    },
  },
}) as UserConfig;
