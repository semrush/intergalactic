import 'dotenv/config';

import { defineConfig } from 'vitepress';
import { configureMarkdownIt } from './markdown-it-config';
import { viteConfig } from './vite.config';
import { sideBarConfig } from './sidebarConfig';
import { buildHooks } from './buildHooks';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Intergalactic',
  description: 'Design system',
  markdown: {
    config(md) {
      configureMarkdownIt(md);
    },
  },

  cleanUrls: true,
  lastUpdated: true,
  vite: viteConfig,

  head: [['link', { rel: 'icon', href: '/miniwhale.png' }]],

  themeConfig: {
    docFooter: {
      prev: false,
      next: false,
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Semrush',
    },
    logo: { src: '/miniwhale.svg', width: 24, height: 24 },
    search: {
      provider: 'algolia',
      options: {
        appId: 'PDUJZB0TBK',
        apiKey: '9ad1935d853b24ce3fe9c0039bcf7b40',
        indexName: 'intergalactic-docs',
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
          // facetFilters: []
        },
      },
    },
    // search: {
    //   provider: 'local',
    //   options: {
    //     detailedView: true,
    //     miniSearch: {
    //       options: {
    //         extractField: (document, fieldName) => {
    //           if (fieldName === 'id') {
    //             if (/#changed$/.test(document.id) || /#changed-\d+$/.test(document.id))
    //               return `${document[fieldName]}-${uniqueId++}`;
    //             if (/#added$/.test(document.id) || /#added-\d+$/.test(document.id))
    //               return `${document[fieldName]}-${uniqueId++}`;
    //             if (/#fixed$/.test(document.id) || /#fixed-\d+$/.test(document.id))
    //               return `${document[fieldName]}-${uniqueId++}`;
    //             if (/#break$/.test(document.id) || /#break-\d+$/.test(document.id))
    //               return `${document[fieldName]}-${uniqueId++}`;
    //             if (/#removed$/.test(document.id) || /#removed-\d+$/.test(document.id))
    //               return `${document[fieldName]}-${uniqueId++}`;
    //           }
    //           return document[fieldName];
    //         },
    //       },
    //     },
    //   },
    // },
    editLink: {
      pattern: 'https://github.com/semrush/intergalactic/edit/master/website/docs/:path',
      text: 'Edit this page on GitHub',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Releases',
        link: 'https://github.com/semrush/intergalactic/releases',
        target: '_blank',
      },
      {
        text: 'Report a bug / Discuss features',
        link: 'https://github.com/semrush/intergalactic/issues',
        target: '_blank',
      },
    ],

    sidebar: sideBarConfig,

    socialLinks: [{ icon: 'github', link: 'https://github.com/semrush/intergalactic' }],
  },

  transformHtml: buildHooks.transformHtml,
  buildEnd: buildHooks.buildEnd,
});
