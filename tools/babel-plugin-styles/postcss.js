const postcss = require('postcss');
const presetEnv = require('postcss-preset-env');
const atImport = require('postcss-import-sync2');
const cssnano = require('cssnano');
const mediarezka = require('@semcore/postcss-mediarezka');
const postcssColorMod = require('postcss-color-mod-function');

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
    mediarezka({
      getMedia: () => {},
      ...options.mediarezka,
    }),
    shadowStyles(options.shadow),
  ];
  if (options.cssnano || (options.cssnano !== null && process.env.NODE_ENV === 'production')) {
    /**
     * `preset` option is required to force `cssnano` use `preset` instead of config search
     */
    // set mergeLonghand: false because the problem of the ratio Api components and styles (see: NoticeBubble)
    processorPlugins.push(
      syncPlugin(
        cssnano(Object.assign({ preset: ['default', { mergeLonghand: false }] }, options.cssnano)),
      ),
    );
  }
  return postcss(processorPlugins);
};
module.exports.PLACEHOLDER_REPLACER = shadowStyles.PLACEHOLDER_REPLACER;
