const recast = require('recast');
const { plugin, filters } = require('../../../utils');
const {
  beforeAfterReplacer,
  createNestedJSXElement,
  spredLabelProps,
  getNewAttributes,
} = require('../../../utils/replacers');

const { hasAnyOfAttributes, attributeName } = filters;
const b = recast.types.builders;
const t = recast.types.namedTypes;

module.exports = ({ source }, { jscodeshift: j }, { printOptions }) => {
  j.use(plugin);

  const ast = j(source);

  const JSXElements = ast.findJSXElementByImportDefaultFromModule('@semcore/switch');

  const sizeAttr = JSXElements.find(j.JSXAttribute, { name: { name: 'size' } });
  sizeAttr.find(j.Literal, { value: 'l' }).replaceWith(j.literal('xl'));
  sizeAttr.find(j.Literal, { value: 'm' }).replaceWith(j.literal('l'));
  sizeAttr.find(j.Literal, { value: 's' }).replaceWith(j.literal('m'));

  // rename onCheckedChange -> onChange
  JSXElements.find(j.JSXAttribute, attributeName('onCheckedChange')).replaceWith((path) => {
    const { value: attrValue } = path.value;
    if (t.JSXExpressionContainer.check(attrValue)) {
      return b.jsxAttribute(b.jsxIdentifier('onChange'), attrValue);
    }
    return path;
  });

  // add all Switch.Value and transfer props
  JSXElements.replaceWith((path) => {
    const node = path.value;
    const { name } = node.openingElement;
    const { value, attributes } = getNewAttributes(node.openingElement.attributes, [
      'labelProps',
      'before',
      'after',
      'size',
      'theme',
    ]);

    const propsParent = Object.keys(value)
      .map((name) => {
        if (name === 'labelProps') {
          return spredLabelProps(value['labelProps']);
        }
        return b.jsxAttribute(b.jsxIdentifier(name), value[name]);
      })
      .reduce((acc, val) => acc.concat(val), []);

    return b.jsxElement(b.jsxOpeningElement(name, propsParent), b.jsxClosingElement(name), [
      createNestedJSXElement(`${name.name}.Value`, node.children, attributes),
    ]);
  });

  // before/after
  JSXElements.filter(hasAnyOfAttributes(['before', 'after'])).replaceWith((path) =>
    beforeAfterReplacer(path, false),
  );

  return ast.toSource(printOptions || {});
};
