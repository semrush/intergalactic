const recast = require('recast');
const b = recast.types.builders;
const t = recast.types.namedTypes;

// ¯\_(ツ)_/¯
/**
 * Заменяет jsx-атрибут
 * @param {String} propName - имя нового атрибута
 * @param {Object} map - мапа сайзов на значение нового атрибута
 * @returns {Function}
 */
function sizeDependentReplacer(propName, map) {
  return function(path) {
    const node = path.value;
    const parent = path.parent.value;
    if (
      !t.JSXOpeningElement.check(parent) ||
      !parent.attributes.find((JSXAttribute) => JSXAttribute.name.name === 'size')
    ) {
      return path;
    }
    const size = parent.attributes.find((JSXAttribute) => JSXAttribute.name.name === 'size').value
      .expression.value;

    let value;
    if (node.value === null) value = map[size];
    if (t.JSXExpressionContainer.check(node.value)) {
      value = node.value.expression.value ? map[size] : 0;
    }
    return b.jsxAttribute(
      b.jsxIdentifier(propName),
      b.jsxExpressionContainer(
        typeof value === 'number' ? b.numericLiteral(value) : b.literal(value),
      ),
    );
  };
}

module.exports = sizeDependentReplacer;
