const postcss = require('postcss');
const presetEnv = require('postcss-preset-env');
const atImport = require('postcss-import-sync2');
const csso = require('postcss-csso');
const postcssColorMod = require('postcss-color-mod-function');
const postcssHoverMediaFeature = require('postcss-hover-media-feature');

const inlineCssVariables = require('./inline-css-variables');
const shadowStyles = require('./postcss-shadow-styles');

const syncPlugin = (plugin) => (root, result) => {
  const { SynchronousPromise } = require('synchronous-promise');
  const realPromise = global.Promise;
  global.Promise = SynchronousPromise;
  plugin(root, result);
  global.Promise = realPromise;
};

module.exports = function (options) {
  const processorPlugins = [
    atImport({
      ...options.import,
      sync: true,
    }),
    syncPlugin(
      presetEnv({
        stage: 0,
        browsers: 'defaults',
        features: {
          'custom-properties': false,
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
    inlineCssVariables(),
    syncPlugin(postcssColorMod()),
    shadowStyles(options.shadow),
    postcssHoverMediaFeature(),
    csso,
  ];
  return postcss(processorPlugins);
};
module.exports.PLACEHOLDER_REPLACER = shadowStyles.PLACEHOLDER_REPLACER;
