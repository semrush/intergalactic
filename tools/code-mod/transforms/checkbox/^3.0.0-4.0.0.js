// jscodeshift -t TRANSFORM_PATH PATH...
// Object.keys(j).filter((name) => name.includes('jsx')));

function isJSXElement(node, name) {
  return node.type === 'JSXElement' && node.openingElement.name.name === name;
}

function isNameElement(node) {
  return node.openingElement.name.name || node.openingElement.name.property.name;
}

function isJSXElementCheckbox(node) {
  return isJSXElement(node, 'Checkbox');
}

function isJSXElementCheckboxGroup(node) {
  return isJSXElement(node, 'CheckboxGroup');
}

function isPropsName(node, name) {
  return node.openingElement.attributes.some((attribute) => attribute.name.name === name);
}

function isJSXElementCheckboxAddon(node, name) {
  return (
    node.type === 'JSXElement' &&
    node.openingElement.name.type === 'JSXMemberExpression' &&
    node.openingElement.name.property.name === name
  );
}

function isJSXElementCheckboxValueInputRef(node) {
  return isJSXElementCheckboxAddon(node, 'Value') && isPropsName(node, 'inputRef');
}

function splitText(text, separator) {
  return text.split(separator).map((string) => string.trim());
}

function getNewAttributes(j, attributes, propsName = []) {
  let value = {};
  if (!attributes.length) return { value, attributes };

  const newAttributes = attributes.filter((attribute) => {
    if (attribute.type === 'JSXAttribute' && propsName.includes(attribute.name.name)) {
      value[attribute.name.name] = attribute.value;
    } else {
      return attribute;
    }
  });
  return { value, attributes: newAttributes };
}

function createAddon(j, path, children, name, selfClosing = false) {
  if (!children) return null;
  const [identifier1, identifier2] = splitText(name, '.');

  return j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(j.jsxIdentifier(identifier1), j.jsxIdentifier(identifier2)),
      [],
      selfClosing,
    ),
    !selfClosing
      ? j.jsxClosingElement(
          j.jsxMemberExpression(j.jsxIdentifier(identifier1), j.jsxIdentifier(identifier2)),
        )
      : null,
    children,
  );
}

function createJSXElement(j, node, tagName, attributes, children) {
  const Tag = tagName ? j.jsxIdentifier(tagName) : node.openingElement.name;

  return j.jsxElement(
    j.jsxOpeningElement(Tag, attributes ? attributes : node.openingElement.attributes),
    j.jsxClosingElement(Tag),
    children ? children : node.children,
  );
}

function setNewAttributesInCheckboxValue(j, child, nameProp) {
  // detected Checkbox.Value
  if (child.openingElement.name.property.name === 'Value') {
    const { attributes: attributesValue } = child.openingElement;

    return [
      ...attributesValue,
      j.jsxSpreadAttribute(j.callExpression(j.jsxIdentifier(nameProp), [])),
    ];
  }
}

function setNewPropInCheckboxValue(j, children, nameProp) {
  return children.map((child) => {
    if (
      child.type === 'JSXElement' &&
      isNameElement(child) &&
      child.openingElement.name.type === 'JSXMemberExpression'
    ) {
      child.openingElement.attributes = setNewAttributesInCheckboxValue(j, child, nameProp);
    }

    if (child.type === 'JSXElement' && child.openingElement.name.name) {
      return setNewPropInCheckboxValue(j, child.children);
    }

    return child;
  });
}

function setValueSize(j, valueSize) {
  if (valueSize.type === 'Literal') {
    const MAP_SIZE = {
      s: 'm',
      m: 'l',
      l: 'xl',
    };

    return j.literal(MAP_SIZE[valueSize.value]);
  }
  return valueSize;
}

function addImport(j, path, defaultName, packageName) {
  return j(path).insertAfter(
    j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(defaultName))],
      j.literal(packageName),
    ),
  );
}

module.exports = function(fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);
  let addImportRootRef = false;

  // CheckboxGroup remove
  ast
    .find(j.JSXElement, { openingElement: { name: { name: 'CheckboxGroup' } } })
    .replaceWith((path) => {
      const children = path.value.children.map((child) => {
        if (
          child.type === 'JSXExpressionContainer' &&
          child.expression.type === 'ArrowFunctionExpression'
        ) {
          const { body } = child.expression;
          return body.type === 'CallExpression' ? j.jsxExpressionContainer(body) : body;
        }
        return child;
      });

      return createJSXElement(j, path.value, 'div', false, children);
    });

  // replace `children` -> Checkbox.Text
  // added `Checkbox` -> Checkbox.Value
  ast.find(j.JSXElement, isJSXElementCheckbox).replaceWith((path) => {
    const { attributes } = getNewAttributes(j, path.node.openingElement.attributes, ['children']);
    const { children: childrenCode } = path.node;
    let hasCheckboxValue = false;
    let hasCheckboxText = false;
    let children = [];

    childrenCode.forEach((child) => {
      if (
        child.type === 'JSXElement' &&
        isNameElement(child) &&
        child.openingElement.name.type === 'JSXMemberExpression'
      ) {
        // detected Checkbox.Value
        if (child.openingElement.name.property.name === 'Value') {
          hasCheckboxValue = true;
        } else if (child.openingElement.name.property.name === 'Text') {
          hasCheckboxText = true;
        }
      }
    });

    if (!hasCheckboxText && childrenCode.length > 0) {
      children = [createAddon(j, path, childrenCode, 'Checkbox.Text')];
    } else if (hasCheckboxText) {
      hasCheckboxText = false;
      return path.node;
    }

    if (!hasCheckboxValue) {
      children = [createAddon(j, path, [], 'Checkbox.Value', true), ...children];
    } else {
      hasCheckboxValue = false;
      return path.node;
    }

    return createJSXElement(j, path.node, '', attributes, children);
  });

  // migration all props, except [size, labelProps] `Checkbox` -> Checkbox.Value
  // replace invalid -> state="invalid"
  ast.find(j.JSXElement, isJSXElementCheckbox).replaceWith((path) => {
    const { value, attributes } = getNewAttributes(j, path.node.openingElement.attributes, [
      'size',
      'labelProps',
      'invalid',
    ]);

    let attributesCheckbox = [];

    // size ['s', 'm', 'l'] -> ['m', 'l', 'xl']
    if (value['size']) {
      attributesCheckbox = [
        j.jsxAttribute(j.jsxIdentifier('size'), setValueSize(j, value['size'])),
      ];
    }

    if (value['invalid'] !== undefined) {
      let literalState = {};
      const valueState = value['invalid'] && value['invalid'].expression.value;
      if (value['invalid'] === null || valueState === true) {
        literalState = j.literal('invalid');
      } else {
        literalState =
          valueState === false
            ? j.literal('normal')
            : j.jsxExpressionContainer(value['invalid'].expression);
      }
      attributesCheckbox = [
        ...attributesCheckbox,
        j.jsxAttribute(j.jsxIdentifier('state'), literalState),
      ];
    }

    if (value['labelProps']) {
      attributesCheckbox = [
        ...attributesCheckbox,

        ...value['labelProps'].expression.properties.reduce((acc, prop) => {
          if (prop.value.type === 'Literal') {
            return (acc = [
              ...acc,
              j.jsxAttribute(j.jsxIdentifier(prop.key.name), j.literal(prop.value.value)),
            ]);
          }

          if (prop.value.type === 'ObjectExpression') {
            return (acc = [
              ...acc,
              j.jsxAttribute(j.jsxIdentifier(prop.key.name), j.jsxExpressionContainer(prop.value)),
            ]);
          }

          return acc;
        }, []),
      ];
    }

    const children = path.node.children.map((child) => {
      if (
        child.type === 'JSXElement' &&
        isNameElement(child) &&
        child.openingElement.name.type === 'JSXMemberExpression'
      ) {
        // detected Checkbox.Value
        if (child.openingElement.name.property.name === 'Value') {
          const { attributes: attributesValue } = child.openingElement;
          child.openingElement.attributes = [...attributesValue, ...attributes];
        }
      }
      return child;
    });

    return createJSXElement(j, path.node, '', attributesCheckbox, children);
  });

  // replace inputRef -> <RootRef rootRef={}>
  ast.find(j.JSXElement, isJSXElementCheckboxValueInputRef).replaceWith((path) => {
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
      [createJSXElement(j, path.node, '', attributes)],
    );
  });

  return ast.toSource();
};
