const algoliasearch = require('algoliasearch');
const { Documentalist, MarkdownPlugin } = require('documentalist');
const CONFIG = require('./client/algolia');
const dataIcons = require('./docs/style/icon/components/icons.json');

const DOCS_DIR = './docs/**/*';

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
            title: c.title,
            slug: `/${c.route}/`,
            disabled: !!pages[c.reference].metadata.disabled,
            search: pages[c.reference].metadata.search,
            category: nav.reduce((title, p) => {
              if (p.children) {
                const child = p.children.find((c1) => c1.reference === c.reference);
                return child ? p.title : title;
              }
              return title;
            }, null),
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

main();
