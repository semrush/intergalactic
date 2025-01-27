import { createWriteStream } from 'node:fs';
import { resolve as resolvePath } from 'node:path';
import { SitemapStream } from 'sitemap';
import type { UserConfig, DefaultTheme } from 'vitepress';
import fs from 'node:fs/promises';
import algoliasearch from 'algoliasearch';
import parseMarkdownMetadata from 'parse-md';
import iconsList from '../style/icon/icons-list.js';
import illustrationsList from '../style/illustration/illustrations-list.js';

import 'dotenv/config';
import { algoliaConfig } from '../../algoliaConfig.js';

const excludeFromSearch = ['a11y-report'];

if (process.env.CI) {
  if (!process.env.ALGOLIA_SECRET_KEY) {
    throw new Error('Create .env file and insert ALGOLIA_SECRET_KEY variable');
  }

  {
    const key = process.env.ALGOLIA_SECRET_KEY;
    const escapedKey =
      key.substring(0, 5) +
      key.substring(5, key.length - 5).replace(/./g, 'X') +
      key.substring(key.length - 5);

    console.info(
      `Publishing algolia search with application id "${algoliaConfig.appName}" and secret key "${escapedKey}"`,
    );
  }
}

const sitemapLinks: { url: string; lastmod?: number }[] = [];
const searchObjects: {
  objectID: number;
  title: string;
  content?: string;
  type: string;
  url: string;
  heading: boolean;
  changelogPage: boolean;
  designPage: boolean;
  lang: string;
  hierarchy: {};
}[] = [];
let objectId = 1;

const transformHtml: UserConfig<DefaultTheme.Config>['transformHtml'] = async (
  _,
  id,
  { pageData, siteConfig },
) => {
  if (!/[\\/]404\.html$/.test(id) && !excludeFromSearch.includes(pageData.relativePath)) {
    sitemapLinks.push({
      url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
      lastmod: pageData.lastUpdated,
    });
    const markdownPath = resolvePath(siteConfig.root, pageData.relativePath);
    const markdownContent = await fs.readFile(markdownPath, 'utf-8');
    const { metadata, content: cleanMarkdownContent } = parseMarkdownMetadata(markdownContent) as {
      metadata: { title: string; tabs: string };
      content: string;
    };
    const tabs = (metadata.tabs || '')
      .split(',')
      .map((tab) => tab.trim())
      .filter(Boolean)
      .map((tab) => {
        const title = tab.split('(')[0].trim();
        const fileName = tab.split("('")[1].split("')")[0].trim() + '.md';
        return { title, fileName };
      });
    const tab = tabs.find((tab) => tab.fileName === markdownPath.split('/').pop());
    const hierarchy: {
      [key in 'lvl0' | 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'lvl6']: string | null;
    } = {
      lvl0: null,
      lvl1: null,
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    };
    let maxDepth = 0;

    if (metadata?.title) {
      hierarchy.lvl0 = metadata.title;
      hierarchy.lvl1 = tab?.title ?? null;
      maxDepth = 1;
    } else {
      hierarchy.lvl0 = tab?.title ?? null;
    }

    const lines = cleanMarkdownContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('#')) {
        const depth = line
          .split(' ')[0]
          .split('')
          .filter((char) => char === '#').length;
        if (maxDepth > depth) {
          for (let j = depth; j <= maxDepth; j++) {
            const level = 'lvl' + j;
            hierarchy[level] = null;
          }
        }
        if (depth > maxDepth) maxDepth = depth;
        const level = 'lvl' + depth;
        const title = line.split(' ').slice(1).join(' ');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        hierarchy[level] = title;
        searchObjects.push({
          objectID: objectId++,
          title: title,
          type: level,
          url:
            'https://developer.semrush.com/intergalactic/' +
            pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2') +
            `#${id}`,
          heading: true,
          hierarchy: { ...hierarchy },
          changelogPage: pageData.relativePath.includes('changelog'),
          designPage: tab?.title === 'Design',
          lang: 'en-US',
        });
      }
    }

    searchObjects.push({
      objectID: objectId++,
      title: metadata?.title ?? pageData.title,
      content: metadata?.title ?? pageData.title,
      type: 'content',
      url:
        'https://developer.semrush.com/intergalactic/' +
        pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
      heading: false,
      hierarchy: { lvl0: hierarchy.lvl0, lvl1: hierarchy.lvl1 },
      changelogPage: pageData.relativePath.includes('changelog'),
      designPage: tab?.title === 'Design',
      lang: 'en-US',
    });
  }
};
const buildEnd: UserConfig<DefaultTheme.Config>['buildEnd'] = async ({ outDir }) => {
  const sitemap = new SitemapStream({
    hostname: 'https://developer.semrush.com/intergalactic/',
  });
  const writeStream = createWriteStream(resolvePath(outDir, 'sitemap.xml'));
  sitemap.pipe(writeStream);
  sitemapLinks.forEach((link) => sitemap.write(link));
  sitemap.end();
  await new Promise((resolve) => writeStream.on('finish', resolve));

  if (process.env.CI) {
    // await fs.writeFile('search-index.json', JSON.stringify(searchObjects, null, 2));
    const client = algoliasearch(algoliaConfig.appName, process.env.ALGOLIA_SECRET_KEY!);
    const mainSearchIndex = client.initIndex(algoliaConfig.mainSearchIndexName);
    const iconsSearchIndex = client.initIndex(algoliaConfig.iconsSearchIndexName);
    const illustrationsSearchIndex = client.initIndex(algoliaConfig.illustrationsSearchIndexName!);

    const iconsSearchObjects = iconsList.icons.map((o, i) => ({ objectID: i, ...o }));
    const illustrationsSearchObjects = illustrationsList.illustrations.map((o, i) => ({
      objectID: i,
      ...o,
    }));

    if (!searchObjects.length || !iconsSearchObjects.length || !illustrationsSearchObjects.length) {
      console.info({
        searchObjects,
        objectIcons: iconsSearchObjects,
        objectIllustrations: illustrationsSearchObjects,
      });
      throw new Error('Empty index was going to be sent to algolia, see above');
    }

    await mainSearchIndex.clearObjects();
    await mainSearchIndex.partialUpdateObjects(searchObjects, {
      createIfNotExists: true,
    });

    await iconsSearchIndex.clearObjects();
    await iconsSearchIndex.partialUpdateObjects(iconsSearchObjects, {
      createIfNotExists: true,
    });

    await illustrationsSearchIndex.clearObjects();
    await illustrationsSearchIndex.partialUpdateObjects(illustrationsSearchObjects, {
      createIfNotExists: true,
    });
  }
};

export const buildHooks = { transformHtml, buildEnd };
