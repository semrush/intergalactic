import 'dotenv/config';

import { resolve as resolvePath } from 'path';

import { defineConfig } from 'vitepress';

import { buildHooks } from './buildHooks';
import { figmaIcon } from './figma-icon';
import { configureMarkdownIt } from './markdown-it-config';
import { sideBarConfig } from './sidebarConfig';
import { viteConfig, currentBuildVersion, LATEST } from './vite.config';
import { algoliaConfig } from '../../algoliaConfig';
import { algoliaIndexes } from '../../algoliaIndexes';

const prefix = currentBuildVersion === LATEST ? 'latest' : currentBuildVersion;
const availableVersions = (process.env.AVAILABLE_VERSIONS ?? '').split(',');
const gtmKey = 'GTM-PP7RKT7';

const links = availableVersions.filter((version) => {
  return version !== currentBuildVersion;
});

let versions: any = null;

if (links.length > 0) {
  versions = {
    currentVersion: currentBuildVersion,
    items: links.reverse(),
  };
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: viteConfig.base,
  outDir: resolvePath(__dirname, 'dist'),
  title: 'Intergalactic Design System',
  description: 'Design System',
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
    // Google Tag Manager
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            'script',
            {},
            'dataLayer = window.dataLayer || []; dataLayer.push({ "userType": "Unlogged-User" });',
          ],
          [
            'script',
            {},
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmKey}');`,
          ],
        ]
      : ([] as any)),
  ],

  themeConfig: {
    docFooter: {
      prev: false,
      next: false,
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Powered by Semrush. All rights reserved.',
    },
    siteTitle: false,
    notFound: {
      quote: 'This page may not exist in this version or the URL might be incorrect. Please check your spelling or try a different documentation version.',
    },

    search: {
      provider: 'algolia',
      options: {
        appId: algoliaConfig.appName,
        apiKey: algoliaConfig.openKey,
        indexName: algoliaIndexes(prefix).mainSearchIndexName,
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
      pattern: `https://github.com/semrush/intergalactic/edit/${currentBuildVersion}/website/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    // @ts-ignore. Need this for custom versions switcher
    versions,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Releases',
        link: 'https://github.com/semrush/intergalactic/releases',
        target: '_blank',
      },
      {
        text: 'Requests & Issues',
        link: 'https://github.com/semrush/intergalactic/issues',
        target: '_blank',
      },
    ],

    sidebar: sideBarConfig,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/semrush/intergalactic',
        ariaLabel: 'GitHub repository',
      },
      {
        icon: { svg: figmaIcon },
        link: 'https://figma.com/@semrush',
        ariaLabel: 'Figma libraries',
      },
    ],
  },

  transformHtml: buildHooks.transformHtml,
  buildEnd: buildHooks.buildEnd,
  transformPageData: buildHooks.transformPageData,
});
