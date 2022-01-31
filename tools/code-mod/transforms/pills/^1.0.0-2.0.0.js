// jscodeshift -t TRANSFORM_PATH PATH...
function isImport(node, imported) {
  return node.type === 'ImportDeclaration' && node.source.value === imported;
}

function isJSXElement(node, name) {
  return node.type === 'JSXElement' && node.openingElement.name.name === name;
}

function isJSXElementPill(node) {
  return isJSXElement(node, 'Pill');
}

function isJSXElementPillGroup(node) {
  return isJSXElement(node, 'PillGroup');
}

function isJSXElementPillAddon(node) {
  return (
    node.type === 'JSXElement' &&
    node.openingElement.name.property &&
    node.openingElement.name.property.name === 'Addon'
  );
}

function isPillsImport(node) {
  return isImport(node, '@semcore/pills');
}

function isDefaultSpecifier(node, name) {
  return node.type === 'ImportDefaultSpecifier' && name === node.local.name;
}

function isSpecifier(node, name = []) {
  return node.type === 'ImportSpecifier' && name.includes(node.imported.name);
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

module.exports = function (fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);

  // replace import
  ast.find(j.ImportDeclaration, isPillsImport).forEach((path) => {
    let newSpecifier = [];
    path.node.specifiers.filter((specifier) => {
      if (!isSpecifier(specifier, ['PillGroup', 'Pill'])) {
        newSpecifier.push(specifier);
      }
    });

    const isDefaultPills = newSpecifier.some((specifier) => isDefaultSpecifier(specifier, 'Pills'));
    if (!isDefaultPills) {
      newSpecifier.push(j.importDefaultSpecifier(j.identifier('Pills')));
    }

    j(path).insertBefore(j.importDeclaration(newSpecifier, path.node.source));
    j(path).remove();
  });

  // replace JSX PillGroup -> Pills
  ast.find(j.JSXElement, isJSXElementPillGroup).replaceWith((path) => {
    return createJSXElement(j, path, 'Pills');
  });

  // replace JSX Pill -> Pills.Item
  ast.find(j.JSXElement, isJSXElementPill).replaceWith((path) => {
    return createJSXElement(j, path, 'Pills.Item');
  });

  // replace JSX Pill.Addon -> Pills.Item.Addon
  ast.find(j.JSXElement, isJSXElementPillAddon).replaceWith((path) => {
    return j.jsxElement(
      j.jsxOpeningElement(
        j.jsxMemberExpression(
          j.jsxMemberExpression(j.jsxIdentifier('Pills'), j.jsxIdentifier('Item')),
          j.jsxIdentifier('Addon'),
        ),
        path.node.openingElement.attributes,
      ),
      j.jsxClosingElement(
        j.jsxMemberExpression(
          j.jsxMemberExpression(j.jsxIdentifier('Pills'), j.jsxIdentifier('Item')),
          j.jsxIdentifier('Addon'),
        ),
        j.jsxIdentifier('Addon'),
      ),
      path.node.children,
    );
  });

  return ast.toSource();
};
