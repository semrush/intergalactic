const postcss = require('postcss');

const pluginName = 'postcss-theme-replacer';

// options - { varsFile }
module.exports = postcss.plugin(pluginName, (options = {}) => {
  const { varsFile } = options;

  return async (root) => {
    if (!varsFile) return;

    root.walkAtRules('import', (atRule) => {
      const { params } = atRule;
      if (params === varsFile) return;

      let innerVarsFile = params.split('/');
      innerVarsFile[innerVarsFile.length - 1] = varsFile;
      innerVarsFile = innerVarsFile.join('/') + "'";

      atRule.params = `${innerVarsFile}`;
    });
  };
});
