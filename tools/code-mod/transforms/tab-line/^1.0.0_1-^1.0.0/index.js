const { plugin } = require('../../../utils');

module.exports = ({ source }, { jscodeshift: j }, { printOptions }) => {
  j.use(plugin);

  const JSXAttribute = (name, value) =>
    j.jsxAttribute(j.jsxIdentifier(name), j.jsxExpressionContainer(value));

  const ast = j(source);
  const JSXElements = ast.findJSXElementByImportDefaultFromModule('@semcore/tab-line');

  const sizeAttr = JSXElements.find(j.JSXAttribute, { name: { name: 'size' } });
  sizeAttr.find(j.Literal, { value: 'l' }).replaceWith(j.literal('xl'));
  sizeAttr.find(j.Literal, { value: 'm' }).replaceWith(j.literal('l'));
  sizeAttr.find(j.Literal, { value: 's' }).replaceWith(j.literal('m'));

  //themes
  JSXElements.find(j.JSXAttribute, {
    name: { name: 'theme' },
    value: { value: 'default' },
  }).replaceWith(JSXAttribute('underlined', j.booleanLiteral(true)));

  JSXElements.find(j.JSXAttribute, {
    name: { name: 'theme' },
    value: { value: 'invert' },
  }).replaceWith(JSXAttribute('underlined', j.booleanLiteral(false)));

  return ast.toSource(printOptions || {});
};
