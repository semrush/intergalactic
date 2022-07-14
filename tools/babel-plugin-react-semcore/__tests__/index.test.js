const pluginTester = require('babel-plugin-tester').default;
const formatter = require('./setupFormatter');
const path = require('path');
const plugin = require('../src/index');

const absolutePath = (relativePath) => path.resolve(__dirname, relativePath);

pluginTester({
  plugin,
  pluginName: '@semcore/babel-plugin-react-semcore',
  filename: __filename,
  formatResult: formatter,
  tests: [
    {
      title: "Doesn't change code",
      fixture: absolutePath('__fixtures__/theme/unchanged/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/unchanged/index.expected.js'),
    },
    {
      title: 'Applies theme',
      fixture: absolutePath('__fixtures__/theme/applied/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/applied/index.expected.js'),
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        pkgName: 'button',
      },
    },
    {
      title: 'Applies purgeCSS options',
      fixture: absolutePath('__fixtures__/theme/purgeCSS/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/purgeCSS/index.expected.js'),
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        pkgName: 'button-purge',
        purgeCSS: { shorten: true },
      },
    },
    {
      title: 'Applies semcore theme',
      fixture: absolutePath('__fixtures__/__theme_fixture__/utils/color.js'),
      outputFixture: absolutePath('__fixtures__/theme/semcore-theme/color.expected.js'),
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        pkgName: 'utils',
        scope: '__tests__',
      },
    },
  ],
});
