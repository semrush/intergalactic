const fs = require('fs');

const CSS_VARS_REG = /--[\w+\-]+:\s+(#[\w\d]+|rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*(\d+(?:\.\d+)?))?\))/g;

function getColorVars(cssPath) {
  const content = fs.readFileSync(cssPath, 'utf8');
  const tokens = content.match(CSS_VARS_REG) ?? [];

  // TODO: in case of containing imports traverse them recursevely

  return tokens.reduce((acc, match) => {
    const [varName, varValue] = match.split(':');
    const colorName = varName.replace('--', '').trim();
    acc[colorName] = varValue.trim();
    return acc;
  }, {});
}

module.exports = getColorVars;
