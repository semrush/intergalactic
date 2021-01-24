const recast = require('recast');
const { plugin, filters } = require('../../../utils');
const { hasAnyOfAttributes } = filters;
const t = recast.types.namedTypes;

module.exports = ({ source }, { jscodeshift: j }, { printOptions }) => {
  j.use(plugin);
  const ast = j(source);

  const SpinContainer = ast.findJSXElementByImportDefaultFromModule('@semcore/spin-container');
  const Spin = ast.findJSXElementByImportDefaultFromModule('@semcore/spin');
  const SpinName = ast.getImportDefaultLocalName('@semcore/spin');
  let valueRemoveSpin = 0;

  // attr <Spin> transfer at SpinContainer
  SpinContainer.filter(hasAnyOfAttributes(['spinner'])).replaceWith((path) => {
    const node = path.value;

    node.openingElement.attributes = node.openingElement.attributes.map((attr) => {
      if (
        t.JSXAttribute.check(attr) &&
        t.JSXIdentifier.check(attr.name) &&
        attr.name.name === 'spinner'
      ) {
        if (
          t.JSXExpressionContainer.check(attr.value) &&
          attr.value.expression.openingElement.name.name === SpinName[0]
        ) {
          valueRemoveSpin += 1;
          return attr.value.expression.openingElement.attributes[0];
        }
      }
      return attr;
    });
    return node;
  });

  // remove import
  if (Spin.length === valueRemoveSpin) {
    ast.find(t.ImportDeclaration).forEach((path) => {
      const node = path.value;
      if (node.source.value === '@semcore/spin') {
        j(path).remove();
      }
    });
  }

  return ast.toSource(printOptions || {});
};
