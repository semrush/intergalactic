const pluginTester = require('babel-plugin-tester');
const removeInject = require('../');

pluginTester({
  plugin: removeInject,
  pluginName: 'babel-plugin-remove-inject',
  filename: __filename,
  pluginOptions: {
    replacePattern: ['es6', 'lib'],
  },
  tests: [
    {
      title: "Shouldn't change code with no Recharts imports",
      fixture: '__fixtures__/1_unchanged.js',
    },
    {
      title: "Shouldn't change code with valid Recharts imports",
      fixture: '__fixtures__/2_unchanged_lib_import_commonjs.js',
    },
    {
      title: 'Should hange Recharts import from es6 to lib for commonjs build',
      fixture: '__fixtures__/3_es6_import_commonjs.js',
      outputFixture: '__fixtures__/3_es6_import_commonjs.expected.js',
    },
    {
      title: 'Should change Recharts import from lib to es6 for es6 build',
      fixture: '__fixtures__/4_lib_import_es6.js',
      outputFixture: '__fixtures__/4_lib_import_es6.expected.js',
      pluginOptions: {
        replacePattern: ['lib', 'es6'],
      },
    },
  ],
});
