// jscodeshift -t TRANSFORM_PATH PATH...

function isJSXElement(node, name) {
  return node.type === 'JSXElement' && node.openingElement.name.name === name;
}

function isPropsName(node, name) {
  return node.openingElement.attributes.some((attribute) => attribute.name.name === name);
}

function isJSXElementButton(node) {
  return isJSXElement(node, 'Button');
}

function isJSXElementButtonInputRef(node) {
  return isJSXElement(node, 'Button') && isPropsName(node, 'inputRef');
}

function isJSXElementButtonBeforeOrAfter(node) {
  return (
    isJSXElement(node, 'Button') && (isPropsName(node, 'before') || isPropsName(node, 'after'))
  );
}

function replaceProps(j, attributes, oldProps, newProps, value) {
  if (!attributes.length) return attributes;

  return attributes.map((attribute) => {
    if (attribute.name.name === oldProps) {
      return j.jsxAttribute(j.jsxIdentifier(newProps), value || attribute.name.value);
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

function replaceFullWidthToWidth(j, attributes) {
  return replaceProps(j, attributes, 'fullWidth', 'w', j.literal('100%'));
}

function splitText(text, separator) {
  return text.split(separator).map((string) => string.trim());
}
function createAddon(j, children, name) {
  if (!children) return null;
  const [identifier1, identifier2] = splitText(name, '.');
  return j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(j.jsxIdentifier(identifier1), j.jsxIdentifier(identifier2)),
    ),
    j.jsxClosingElement(
      j.jsxMemberExpression(j.jsxIdentifier(identifier1), j.jsxIdentifier(identifier2)),
    ),
    [children],
  );
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

function addImport(j, path, defaultName, packageName) {
  return j(path).insertAfter(
    j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(defaultName))],
      j.literal(packageName),
    ),
  );
}

module.exports = function (fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);
  let addImportRootRef = false;

  // replace fullWidth -> width="100%"
  ast.find(j.JSXElement, isJSXElementButton).replaceWith((path) => {
    return createJSXElement(
      j,
      path,
      '',
      replaceFullWidthToWidth(j, path.node.openingElement.attributes),
    );
  });

  // replace inputRef -> <RootRef rootRef={}>
  ast.find(j.JSXElement, isJSXElementButtonInputRef).replaceWith((path) => {
    const { value, attributes } = getNewAttributes(j, path.node.openingElement.attributes, [
      'inputRef',
    ]);
    // add import RootRef
    if (!addImportRootRef) {
      const importPackages = ast.find(j.ImportDeclaration);
      const { length } = importPackages;
      importPackages.forEach((path, index) => {
        if (index === length - 1) {
          addImport(j, path, 'RootRef', '@semcore/root-ref');
        }
      });

      addImportRootRef = true;
    }

    return j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('RootRef'), [
        j.jsxAttribute(j.jsxIdentifier('rootRef'), value['inputRef']),
      ]),
      j.jsxClosingElement(j.jsxIdentifier('RootRef')),
      [createJSXElement(j, path, '', attributes)],
    );
  });

  // replace `before`/`after` -> Button.Addon
  ast.find(j.JSXElement, isJSXElementButtonBeforeOrAfter).replaceWith((path) => {
    const { value, attributes } = getNewAttributes(j, path.node.openingElement.attributes, [
      'before',
      'after',
    ]);

    let children = path.node.children.map((child) => {
      if (child.type === 'JSXText') {
        return createAddon(j, j.jsxText(child.value), 'Button.Text');
      }
    });

    children = [
      createAddon(j, value['before'] ? value['before'].expression : undefined, 'Button.Addon'),
      ...children,
      createAddon(j, value['after'] ? value['after'].expression : undefined, 'Button.Addon'),
    ];

    return createJSXElement(
      j,
      path,
      '',
      attributes,
      children.filter((item) => item !== null),
    );
  });

  return ast.toSource();
};
