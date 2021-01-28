const pluginTester = require('babel-plugin-tester').default;
const formatter = require('./setupFormatter');
const media = require('@semcore/babel-plugin-react-semcore');

pluginTester({
  plugin: media,
  pluginName: '@semcore/babel-plugin-react-semcore',
  filename: __filename,
  formatResult: formatter,
  tests: [
    {
      pluginOptions: {
        media: true,
      },
      title: 'Removes unreachable if statement wrapper of media styles insertion call',
      fixture: '__fixtures__/add-media/index.js',
      outputFixture: '__fixtures__/add-media/index.expected.js',
    },
    {
      title: "Doesn't change code",
      fixture: '__fixtures__/theme/unchanged/index.js',
      outputFixture: '__fixtures__/theme/unchanged/index.expected.js',
    },
    {
      pluginOptions: {
        theme: '__tests__/__fixtures__/__theme_fixture__',
        pkgName: 'button',
      },
      title: 'Applies theme',
      fixture: '__fixtures__/theme/applied/index.js',
      outputFixture: '__fixtures__/theme/applied/index.expected.js',
    },
    {
      pluginOptions: {
        theme: '__tests__/__fixtures__/__theme_fixture__',
        pkgName: 'button-purge',
        purgeCSS: { shorten: true },
      },
      title: 'Applies purgeCSS options',
      fixture: '__fixtures__/theme/purgeCSS/index.js',
      outputFixture: '__fixtures__/theme/purgeCSS/index.expected.js',
    },
  ],
});
