const pluginTester = require('babel-plugin-tester').default;
const path = require('path');
const plugin = require('../src/index');

const absolutePath = (relativePath) => path.resolve(__dirname, relativePath);

const findPackage = (filename) => require(path.join(path.dirname(filename), '_package.json'));

pluginTester({
  plugin,
  pluginName: '@semcore/babel-plugin-react-semcore',
  filename: __filename,
  tests: [
    {
      title: "Doesn't change code",
      fixture: absolutePath('__fixtures__/theme/unchanged/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/unchanged/index.expected.js'),
      findPackage,
    },
    {
      title: 'Applies theme',
      fixture: absolutePath('__fixtures__/theme/applied/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/applied/index.expected.js'),
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        findPackage,
      },
    },
    {
      title: 'Applies purgeCSS options',
      fixture: absolutePath('__fixtures__/theme/purgeCSS/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/purgeCSS/index.expected.js'),
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        purgeCSS: { shorten: true },
        findPackage,
      },
    },
    {
      title: 'Applies semcore theme',
      fixture: absolutePath('__fixtures__/theme/semcore-theme/color.js'),
      outputFixture: absolutePath('__fixtures__/theme/semcore-theme/color.expected.js'),
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        findPackage,
      },
    },
  ],
});
