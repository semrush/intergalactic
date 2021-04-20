const postcss = require('postcss');
const presetEnv = require('postcss-preset-env');
const atImport = require('postcss-import-sync2');

const shadowStyles = require('./postcss-shadow-styles');

const syncPlugin = (plugin) => (root, result) => {
  const { SynchronousPromise } = require('synchronous-promise');
  const realPromise = global.Promise;
  global.Promise = SynchronousPromise;
  plugin(root, result);
  global.Promise = realPromise;
};

module.exports = function(options) {
  return postcss([
    atImport({
      ...options.import,
      sync: true,
    }),
    syncPlugin(
      presetEnv({
        stage: 0,
        browsers: 'defaults',
        features: {
          'custom-properties': {
            preserve: false,
          },
          'custom-media-queries': {
            preserve: false,
          },
          'color-mod-function': {
            unresolved: 'error',
          },
        },
        ...options.presetEnv,
      }),
    ),
    shadowStyles(options.shadow),
  ]);
};
module.exports.PLACEHOLDER_REPLACER = shadowStyles.PLACEHOLDER_REPLACER;
