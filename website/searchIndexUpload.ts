import dotenv from 'dotenv';

// eslint-disable-next-line import/extensions
import CONFIG from './src/algolia.js';
// eslint-disable-next-line import/extensions
import dataIcons from './docs/style/icon/components/icons-list.js';

import algoliasearch from 'algoliasearch';
import { buildNavigation } from './builder/navigation';
import { resolve as resolvePath } from 'path';
import { buildArticle } from './builder/build-article/build-article';

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

  // eslint-disable-next-line no-console
  console.info(
    `Publishing algolias search with application id "${CONFIG.ALGOLIA_APP}" and secret key "${escapedKey}"`,
  );
}

const client = algoliasearch(CONFIG.ALGOLIA_APP, process.env.ALGOLIA_SECRET_KEY);
const index = client.initIndex(CONFIG.ALGOLIA_INDEX);
const indexIcons = client.initIndex(CONFIG.ALGOLIA_INDEX_ICONS);

const { navigationTree } = await buildNavigation(docsDir);

const objects: {
  objectID: number;
  pageTitle: string;
  title: string;
  slug: string;
  disabled: boolean;
  heading: boolean;
  category: string;
}[] = [];

let objectId = 1;

const traverse = async (node, parentNode?) => {
  const articlePath = resolvePath(docsDir, node.filePath);
  const article = await buildArticle(docsDir, articlePath, node.filePath);

  objects.push({
    objectID: objectId++,
    pageTitle: node.title,
    title: node.title,
    slug: `/${node.route}/`,
    disabled: node.metadata.disabled ?? false,
    heading: false,
    category: parentNode?.title,
  });

  for (const heading of article.headings) {
    objects.push({
      objectID: objectId++,
      pageTitle: node.title,
      title: heading.html,
      slug: `/${node.route}/#${heading.id}`,
      disabled: node.metadata.disabled ?? false,
      heading: true,
      category: parentNode?.title,
    });
  }

  if (node.children) {
    await Promise.all(node.children.map((child) => traverse(child, node)));
  }
};
await Promise.all(navigationTree.map((node) => traverse(node)));

const objectIcons = dataIcons.icons.map((o, i) => ({ objectID: i, ...o }));

if (!objects.length || !objectIcons.length) {
  // eslint-disable-next-line no-console
  console.info({
    objects,
    objectIcons,
  });
  throw new Error(`Empty index was going to be sent to algolia, see above`);
}

await index.clearObjects();
await index.partialUpdateObjects(objects, {
  createIfNotExists: true,
});

await indexIcons.clearObjects();
await indexIcons.partialUpdateObjects(objectIcons, {
  createIfNotExists: true,
});
