// jscodeshift -t TRANSFORM_PATH PATH...
function isImport(node, imported) {
  return node.type === 'ImportDeclaration' && node.source.value === imported;
}

function isJSXElement(node, name) {
  return node.type === 'JSXElement' && node.openingElement.name.name === name;
}

function isJSXElementTextareaAutoSize(node) {
  return isJSXElement(node, 'TextareaAutoSize');
}

function isTextareaImport(node) {
  return isImport(node, '@semcore/textarea');
}

function isSpecifier(node, name) {
  return node.type === 'ImportSpecifier' && node.imported.name === name;
}

function isPropsName(node, name) {
  return node.openingElement.attributes.some((attribute) => attribute.name.name === name);
}

function isJSXElementTextareaProps(node, propsName) {
  return isJSXElement(node, 'Textarea') && isPropsName(node, propsName);
}

function replaceImport(j, path, importName) {
  if (path) {
    const importStatement = j.importDeclaration(
      path.node.specifiers.filter((specifier) => !isSpecifier(specifier, importName)),
      path.node.source,
    );
    j(path).insertBefore(importStatement);
    j(path).remove();
  }
}

function removeProps(j, path, propsName) {
  return createJSXElement(
    j,
    path,
    '',
    path.node.openingElement.attributes.filter((attribute) => attribute.name.name !== propsName),
  );
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

function addImport(j, path, defaultName, packageName) {
  return j(path).insertAfter(
    j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(defaultName))],
      j.literal(packageName),
    ),
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

module.exports = function(fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);
  let addImportRootRef = false;

  // remove import {TextareaAutoSize}
  ast
    .find(j.ImportDeclaration, isTextareaImport)
    .forEach((path) => replaceImport(j, path, 'TextareaAutoSize'));

  // replace TextareaAutoSize -> Textarea
  ast.find(j.JSXElement, isJSXElementTextareaAutoSize).replaceWith((path) => {
    return createJSXElement(j, path, 'Textarea');
  });

  // remove fullWidth
  ast
    .find(j.JSXElement, (node) => isJSXElementTextareaProps(node, 'fullWidth'))
    .replaceWith((path) => {
      return removeProps(j, path, 'fullWidth');
    });

  // remove focused
  ast
    .find(j.JSXElement, (node) => isJSXElementTextareaProps(node, 'focused'))
    .replaceWith((path) => {
      return removeProps(j, path, 'focused');
    });

  // replace inputRef -> <RootRef rootRef={}>
  ast
    .find(j.JSXElement, (node) => isJSXElementTextareaProps(node, 'inputRef'))
    .replaceWith((path) => {
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

  return ast.toSource();
};
