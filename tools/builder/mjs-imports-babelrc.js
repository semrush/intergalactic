const defaultConf = require('@semcore/babel-preset-ui/.babelrc');

module.exports = function (babel, opts = {}) {
  const defaultConfig = defaultConf(babel, {...opts, isEsm: true});

  defaultConfig.plugins.push([
    'replace-import-extension', { extMapping: { '.json': '.json', '': '.mjs', '.css': '.css' } }
  ])

  return defaultConfig;
};
