// jscodeshift -t TRANSFORM_PATH PATH...
function getNameFlex(node) {
  return node.openingElement.name.name || node.openingElement.name.property.name;
}
function isJSXElement(node, name) {
  return node.type === 'JSXElement' && getNameFlex(node) === name;
}

function isPropsName(node, name) {
  return node.openingElement.attributes.some((attribute) => attribute.name.name === name);
}

function isJSXElementFlexPropsFlex(node) {
  return isJSXElement(node, 'Flex') && isPropsName(node, 'flex');
}

function isJSXElementFlexPropsAlignOrJustifyContent(node) {
  return (
    isJSXElement(node, 'Flex') &&
    (isPropsName(node, 'alignContent') || isPropsName(node, 'justifyContent'))
  );
}

function replaceProps(j, attributes, oldProps, newProps, value) {
  if (!attributes.length) return attributes;

  return attributes.map((attribute) => {
    if (attribute.name.name === oldProps) {
      return j.jsxAttribute(j.jsxIdentifier(newProps), value || attribute.value);
    }
    return attribute;
  });
}

function replaceFlexToFlexWrap(j, attributes) {
  return replaceProps(j, attributes, 'flex', 'flexWrap');
}

function getValueAttribute(attribute) {
  return attribute.value.value || attribute.value.expression.value;
}

function replaceValueProps(j, attributes, propsName = [], attributeName = []) {
  return attributes.map((attribute) => {
    if (
      propsName.includes(attribute.name.name) &&
      attributeName.includes(getValueAttribute(attribute))
    ) {
      return j.jsxAttribute(attribute.name, j.literal(`space-${getValueAttribute(attribute)}`));
    }
    return attribute;
  });
}

function getNewAttributes(j, attributes, propsName = []) {
  if (!attributes.length) return attributes;
  let value = {};
  const newAttributes = attributes.filter((attribute) => {
    if (propsName.includes(attribute.name.name)) {
      value[attribute.name.name] = attribute.value;
    } else {
      return attribute;
    }
  });
  return { value, attributes: newAttributes };
}

function createJSXElement(j, path, tagName, attributes, children) {
  const Tag = tagName ? j.jsxIdentifier(tagName) : path.node.openingElement.name;
  const { selfClosing } = path.node.openingElement;

  return j.jsxElement(
    j.jsxOpeningElement(
      Tag,
      attributes ? attributes : path.node.openingElement.attributes,
      selfClosing,
    ),
    selfClosing ? path.node.closingElement : j.jsxClosingElement(Tag),
    children ? children : path.node.children,
  );
}

module.exports = function(fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);

  // flex -> flexWrap
  ast.find(j.JSXElement, isJSXElementFlexPropsFlex).replaceWith((path) => {
    return createJSXElement(
      j,
      path,
      '',
      replaceFlexToFlexWrap(j, path.node.openingElement.attributes),
    );
  });

  // alignContent, justifyContent  between -> space-between
  // alignContent, justifyContent around -> space-around
  ast.find(j.JSXElement, isJSXElementFlexPropsAlignOrJustifyContent).replaceWith((path) => {
    return createJSXElement(
      j,
      path,
      '',
      replaceValueProps(
        j,
        path.node.openingElement.attributes,
        ['alignContent', 'justifyContent'],
        ['between', 'around'],
      ),
    );
  });

  return ast.toSource();
};
