import dotenv from 'dotenv';

import CONFIG from '../src/algolia.js';

import dataIcons from '../docs/style/icon/components/icons-list.js';
import dataIllustrations from '../docs/style/illustration/components/illustrations-list.js';

import algoliasearch from 'algoliasearch';
import { buildNavigation } from '../builder/navigation';
import { resolve as resolvePath } from 'node:path';
import { buildArticle } from '../builder/build-article/build-article';

dotenv.config();

const docsDir = resolvePath('./docs');

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
    `Publishing algolias search with application id "${CONFIG.appName}" and secret key "${escapedKey}"`,
  );
}

const client = algoliasearch(CONFIG.appName, process.env.ALGOLIA_SECRET_KEY);
const index = client.initIndex(CONFIG.mainSearchIndexName);
const indexIcons = client.initIndex(CONFIG.iconsSearchIndexName);
const indexIllustrations = client.initIndex(CONFIG.illustrationsSearchIndexName);

const { navigationTree, existingRoutes } = await buildNavigation(docsDir);

const objects: {
  objectID: number;
  pageTitle: string;
  title: string;
  slug: string;
  disabled: boolean;
  heading: boolean;
  category: string;
  hierarchy: {};
}[] = [];

let objectId = 1;

const traverse = async (node, parentNode?) => {
  const articlePath = resolvePath(docsDir, node.filePath);
  const article = await buildArticle(docsDir, articlePath, node.filePath, existingRoutes);

  if (node.hasContent && node.title) {
    objects.push({
      objectID: objectId++,
      pageTitle: node.title,
      title: node.title,
      slug: `/${node.route}/`,
      disabled: node.metadata.disabled ?? false,
      heading: false,
      category: parentNode?.title,
      hierarchy: {},
    });
  }

  for (const heading of article.headings) {
    if ('html' in heading && 'id' in heading) {
      objects.push({
        objectID: objectId++,
        pageTitle: node.title,
        title: heading.html,
        slug: `/${node.route}/#${heading.id}`,
        disabled: node.metadata.disabled ?? false,
        heading: true,
        category: parentNode?.title,
        hierarchy: {},
      });
    }
  }

  if (node.children) {
    await Promise.all(node.children.map((child) => traverse(child, node)));
  }
};
await Promise.all(navigationTree.map((node) => traverse(node)));

const objectIcons = dataIcons.icons.map((o, i) => ({ objectID: i, ...o }));
const objectIllustrations = dataIllustrations.illustrations.map((o, i) => ({ objectID: i, ...o }));

if (!objects.length || !objectIcons.length || !objectIllustrations.length) {
  console.info({
    objects,
    objectIcons,
    objectIllustrations,
  });
  throw new Error('Empty index was going to be sent to algolia, see above');
}

await index.clearObjects();
await index.partialUpdateObjects(objects, {
  createIfNotExists: true,
});

await indexIcons.clearObjects();
await indexIcons.partialUpdateObjects(objectIcons, {
  createIfNotExists: true,
});

await indexIllustrations.clearObjects();
await indexIllustrations.partialUpdateObjects(objectIllustrations, {
  createIfNotExists: true,
});
