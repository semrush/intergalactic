import { defineConfig } from 'vite';
import { createUnplugin } from 'unplugin';
import { resolveSemcoreSources } from './resolve-semcore-sources';
import { loadSemcoreSources } from './load-semcore-sources';
import pluginReact from '@vitejs/plugin-react';
import { resolve as resolvePath } from 'path';
import { unpluginIcons } from './unplugins/unplugin-icons';
import { unpluginStatic } from './unplugins/unplugin-static';
import { unpluginIllustrations } from './unplugins/unplugin-illustrations';
import { unpluginCrutches } from './unplugins/unplugin-intergalactic-crutches';

export const viteConfig = defineConfig({
  plugins: [
    pluginReact(),
    createUnplugin<{}>(() => ({
      name: 'semcore-resolve',
      async resolveId(id) {
        if (!id.includes('@semcore') && !id.includes('/semcore/')) return null;
        if (id.endsWith('.md')) return null;
        return await resolveSemcoreSources(id);
      },
      loadInclude: (id) => {
        return id.includes('/semcore/');
      },
      async load(id) {
        return await loadSemcoreSources(id);
      },
      enforce: 'pre',
    })).vite({}),
    createUnplugin<{}>(() => ({
      name: 'docs-components-resolver',
      async resolveId(id) {
        if (!id.startsWith('@components/')) return null;
        const purePath = id.substring('@components/'.length);
        return `${resolvePath(__dirname, '../../src/docs-components', purePath)}.jsx`;
      },
    })).vite({}),
    createUnplugin<{}>(() => ({
      name: 'docs-resolver',
      async resolveId(id) {
        if (!id.startsWith('@docs/')) return null;
        const purePath = id.substring('@docs/'.length);
        return `${resolvePath(__dirname, '../../src/docs', purePath)}.jsx`;
      },
    })).vite({}),
    unpluginIcons.vite({}),
    unpluginStatic.vite({}),
    unpluginIllustrations.vite({}),
    // unpluginCssModules.vite({}),
    unpluginCrutches.vite({}),

    // build.onResolve({ filter: /^@docs\/.*\.md$/ }, async ({ path }) => {
    //   const purePath = resolvePath(docsDir, path.substring('@docs/'.length));

    //   return { path: purePath };
    // });
    createUnplugin<{}>(() => ({
      name: 'typescript-data-resolver',
      async resolveId(id) {
        if (id !== '@types.data.ts') return null;
        return resolvePath(__dirname, '../../builder/typings/types.data.ts');
      },
    })).vite({}),
  ],
  server: {
    proxy: {
      '/intergalactic': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/intergalactic/, ''),
      },
    },
  },
});
