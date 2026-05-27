const path = require('node:path');

const cssnano = require('cssnano');
const postcss = require('postcss');
const postcssColorMod = require('postcss-color-mod-function');
const postcssHoverMediaFeature = require('postcss-hover-media-feature');
const atImport = require('postcss-import-sync2');
const mixins = require('postcss-mixins');
const presetEnv = require('postcss-preset-env');

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
    mixins({
      mixinsFiles: path.join(__dirname, '../../../semcore/base-components/src/components/flex-box/style/focus-outline-mixin.css'),
    }),
    inlineCssVariables(),
    syncPlugin(postcssColorMod()),
    shadowStyles(options.shadow),
    postcssHoverMediaFeature(),
    cssnano(),
  ];
  return postcss(processorPlugins);
};
module.exports.PLACEHOLDER_REPLACER = shadowStyles.PLACEHOLDER_REPLACER;
