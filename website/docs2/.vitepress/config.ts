import 'dotenv/config';

import { defineConfig } from 'vitepress';
import { configureMarkdownIt } from './markdown-it-config';
import { viteConfig } from './vite.config';
import { sideBarConfig } from './sidebarConfig';
import { buildHooks } from './buildHooks';
import { algoliaConfig } from '../../algoliaConfig';
import { figmaIcon } from './figma-icon';
import { resolve as resolvePath } from 'path';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/intergalactic/',
  outDir: resolvePath(__dirname, 'dist/intergalactic/'),
  title: 'Intergalactic',
  description: 'Design system',
  markdown: {
    config(md) {
      configureMarkdownIt(md);
    },
  },

  cleanUrls: true,
  lastUpdated: true,
  vite: viteConfig as any,

  head: [
    ['link', { rel: 'apple-touch-icon', href: '/intergalactic/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'icon', href: '/intergalactic/favicon.ico' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/intergalactic/favicon/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/intergalactic/favicon/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/intergalactic/site.webmanifest' }],
    [
      'link',
      { rel: 'mask-icon', href: '/intergalactic/favicon/safari-pinned-tab.svg', color: '#421983' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#603cba' }],
  ],

  themeConfig: {
    docFooter: {
      prev: false,
      next: false,
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: '© 2008-2023 Powered by Semrush. All rights reserved.',
    },
    siteTitle: false,

    search: {
      provider: 'algolia',
      options: {
        appId: algoliaConfig.appName,
        apiKey: algoliaConfig.openKey,
        indexName: algoliaConfig.mainSearchIndexName,
        searchParameters: {
          attributesToRetrieve: [
            'hierarchy',
            'url',
            'title',
            'type',
            'pageTitle',
            'disabled',
            'heading',
            'content',
          ],
        },
      },
    },
    editLink: {
      pattern: 'https://github.com/semrush/intergalactic/edit/master/website/docs/:path',
      text: 'Edit this page on GitHub',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Roadmap',
        link: 'https://github.com/orgs/semrush/projects/3/views/2',
        target: '_blank',
      },
      {
        text: 'Releases',
        link: 'https://github.com/semrush/intergalactic/releases',
        target: '_blank',
      },
      {
        text: 'Report a bug / Discuss feature',
        link: 'https://github.com/semrush/intergalactic/issues',
        target: '_blank',
      },
    ],

    sidebar: sideBarConfig,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/semrush/intergalactic',
        ariaLabel: 'Go to GitHub repository',
      },
      {
        icon: { svg: figmaIcon },
        link: 'https://figma.com/@semrush',
        ariaLabel: 'Go to Intergalactic Design System Figma libraries',
      },
    ],
  },

  transformHtml: buildHooks.transformHtml,
  buildEnd: buildHooks.buildEnd,
});
