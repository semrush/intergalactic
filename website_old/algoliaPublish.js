require('dotenv').config();
const algoliasearch = require('algoliasearch');
const { Documentalist, MarkdownPlugin } = require('documentalist');
const CONFIG = require('./client/algolia');
const dataIcons = require('./docs/style/icon/components/icons-list');
const crypto = require('crypto');

const DOCS_DIR = './docs/**/*';

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
  console.log(
    `Publishsing algolias search with application id "${CONFIG.ALGOLIA_APP}" and secret key "${escapedKey}"`,
  );
}

const client = algoliasearch(CONFIG.ALGOLIA_APP, process.env.ALGOLIA_SECRET_KEY);
const index = client.initIndex(CONFIG.ALGOLIA_INDEX);
const indexIcons = client.initIndex(CONFIG.ALGOLIA_INDEX_ICONS);

const processDocumentalist = new Documentalist({}, [
  {
    pattern: /\.mdx?$/,
    plugin: new MarkdownPlugin(),
  },
]);

async function main() {
  const { nav, pages } = await processDocumentalist.documentGlobs(DOCS_DIR);

  const objects = nav
    .reduce((navigation, n) => {
      if (n.children && !pages[n.reference].metadata.hide) {
        n.children.forEach((c) => {
          navigation.push({
            pageTitle: c.title,
            title: c.title,
            slug: `/${c.route}/`,
            disabled: !!pages[c.reference].metadata.disabled,
            search: pages[c.reference].metadata.search,
            heading: false,
            category: nav.reduce((title, p) => {
              if (p.children) {
                const child = p.children.find((c1) => c1.reference === c.reference);
                return child ? p.title : title;
              }
              return title;
            }, null),
          });
          c.children
            .filter(
              (el) => !['API', 'A11y', 'Changelog', 'Description', 'Example'].includes(el.title),
            )
            .map((el) => {
              const hash = `#a${crypto
                .createHash('md5')
                .update(el.title)
                .digest('hex')
                .slice(0, 5)}`;
              navigation.push({
                pageTitle: c.title,
                title: el.title,
                slug: `/${el.route.split('.')[0]}/${hash}`,
                disabled: !!pages[c.reference].metadata.disabled,
                search: pages[c.reference].metadata.search,
                heading: true,
                category: nav.reduce((title, p) => {
                  if (p.children) {
                    const child = p.children.find((c1) => c1.reference === c.reference);
                    return child ? p.title : title;
                  }
                  return title;
                }, null),
              });
            });
        });
      }
      return navigation;
    }, [])
    .map((o, i) => ({ objectID: i, ...o }));

  const objectIcons = dataIcons.icons.map((o, i) => ({ objectID: i, ...o }));

  await index.clearObjects();
  await index.partialUpdateObjects(objects, {
    createIfNotExists: true,
  });

  await indexIcons.clearObjects();
  await indexIcons.partialUpdateObjects(objectIcons, {
    createIfNotExists: true,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
