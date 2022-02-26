const pluginTester = require('babel-plugin-tester').default;
const formatter = require('./setupFormatter');
const media = require('@semcore/babel-plugin-react-semcore');
const path = require('path');
const absolutePath = (relativePath) => path.resolve(__dirname, relativePath);

pluginTester({
  plugin: media,
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
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        pkgName: 'button',
      },
      title: 'Applies theme',
      fixture: absolutePath('__fixtures__/theme/applied/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/applied/index.expected.js'),
    },
    {
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        pkgName: 'button-purge',
        purgeCSS: { shorten: true },
      },
      title: 'Applies purgeCSS options',
      fixture: absolutePath('__fixtures__/theme/purgeCSS/index.js'),
      outputFixture: absolutePath('__fixtures__/theme/purgeCSS/index.expected.js'),
    },
    {
      pluginOptions: {
        theme: absolutePath('__fixtures__/__theme_fixture__'),
        pkgName: 'utils',
        scope: '__tests__',
      },
      title: 'Applies semcore theme',
      fixture: absolutePath('__fixtures__/__theme_fixture__/utils/color.js'),
      outputFixture: absolutePath('__fixtures__/theme/semcore-theme/color.expected.js'),
    },
  ],
});
