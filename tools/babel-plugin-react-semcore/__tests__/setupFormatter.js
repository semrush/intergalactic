const path = require('path');
const { resolveConfig, format } = require('prettier');

module.exports = function(code, { fileName }) {
  const prettierConfig = path.resolve(__dirname, '../../.prettierrc');
  const config = resolveConfig.sync(prettierConfig);

  return format(code, {
    filepath: fileName,
    parser: 'babel',
    ...config,
  });
};
