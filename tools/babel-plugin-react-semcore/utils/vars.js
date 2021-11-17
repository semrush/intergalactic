const fs = require('fs');

const CSS_VARS_REG = /--[\w+\-]+:\s+(#[\w\d]+|rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*(\d+(?:\.\d+)?))?\))/g;

// const cssVarsPath = path.resolve(__dirname, '../', 'style/var.css');
//
// const cssVarsContent = fs.readFileSync(cssVarsPath, 'utf8');
//
// const varsList = cssVarsContent.match(CSS_VARS_REG).map(cssVarDeclaration => {
//   const [varName, varValue] = cssVarDeclaration.split(':');
//   const colorName = varName.replace('--', '').trim();
//   return { [colorName]: varValue.trim() };
// });
// module.exports = Object.assign({}, ...varsList);

function getColorVars(cssPath) {
  const content = fs.readFileSync(cssPath, 'utf8');
  return content.match(CSS_VARS_REG).reduce((acc, match) => {
    const [varName, varValue] = match.split(':');
    const colorName = varName.replace('--', '').trim();
    acc[colorName] = varValue.trim();
    return acc;
  }, {});
}

module.exports = getColorVars;
