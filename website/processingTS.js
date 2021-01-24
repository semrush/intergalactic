const path = require('path');
const { Documentalist, TypescriptPlugin } = require('documentalist');

const COMPONENTS_DIR = process.argv[2];

const processDocumentalist = new Documentalist({}, [
  {
    pattern: /\.tsx?$/,
    plugin: new TypescriptPlugin({
      includeDeclarations: true,
    }),
  },
]);

processDocumentalist
  .documentGlobs(path.join(__dirname, COMPONENTS_DIR))
  .then((data) => {
    console.log(JSON.stringify(data));
  })
  .catch((e) => {
    console.error(e);
  });
