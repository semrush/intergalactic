import { defineConfig } from 'vite';
import { createUnplugin } from 'unplugin';
import { resolveSemcoreSources } from './resolve-semcore-sources';
import { loadSemcoreSources } from './load-semcore-sources';
import pluginReact from '@vitejs/plugin-react';
import { resolve as resolvePath } from 'path';
import { unpluginIcons } from './unplugins/unplugin-icons';
import { unpluginStatic } from './unplugins/unplugin-static';
import { unpluginIllustrations } from './unplugins/unplugin-illustrations';
import { fileURLToPath, URL } from 'url';

export const viteConfig = defineConfig({
  base: '/intergalactic/',
  plugins: [
    pluginReact({
      babel: {
        plugins: ['@babel/plugin-syntax-import-assertions', '@semcore/babel-plugin-styles'],
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
    createUnplugin<{}>(() => ({
      name: 'stories-resolver',
      async resolveId(id) {
        if (!id.startsWith('stories/')) return null;
        const purePath = id.substring('stories/'.length);
        return resolvePath(__dirname, '../../../stories', purePath);
      },
    })).vite({}),
    unpluginIcons.vite({}),
    unpluginStatic.vite({}),
    unpluginIllustrations.vite({}),
    createUnplugin<{}>(() => ({
      name: 'typescript-data-resolver',
      async resolveId(id) {
        if (id !== '@types.data.ts') return null;
        return resolvePath(__dirname, '../../builder/typings/types.data.ts');
      },
    })).vite({}),
  ],
  build: {
    chunkSizeWarningLimit: 1500,
  },
  resolve: {
    alias: [
      {
        find: /^.*\/VPSidebarItem\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPSidebarItem.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPNavBarMenu\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPNavBarMenu.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPNavBarTitle\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPNavBarTitle.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPSwitchAppearance\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPSwitchAppearance.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPSocialLinks\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPSocialLinks.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPDocAside\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPDocAside.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPDoc\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPDoc.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPDocFooter\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPDocFooter.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPHero\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPHero.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPFeatures\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPFeatures.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPFeature\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPFeature.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPHome\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPHome.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPSidebar\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPSidebar.vue', import.meta.url)),
      },
      {
        find: /^.*\/VPNavBarSearchButton\.vue$/,
        replacement: fileURLToPath(new URL('./theme/VPNavBarSearchButton.vue', import.meta.url)),
      },
    ],
  },
});
