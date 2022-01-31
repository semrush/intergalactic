// jscodeshift -t TRANSFORM_PATH PATH...
function isRadio(node) {
  return node.openingElement.name.name === 'RadioGroup';
}

function createJSXElement(j, node, tagName, attributes, children) {
  const Tag = tagName ? j.jsxIdentifier(tagName) : node.openingElement.name;

  return j.jsxElement(
    j.jsxOpeningElement(Tag, attributes ? attributes : node.openingElement.attributes),
    j.jsxClosingElement(Tag),
    children ? children : node.children,
  );
}

function splitText(text, separator) {
  return text.split(separator).map((string) => string.trim());
}

function createAddon(j, children, name, selfClosing = false) {
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

function getNewAttributes(j, attributes, propsName = []) {
  let value = {};
  if (!attributes.length) return { value, attributes };

  const newAttributes = attributes.filter((attribute) => {
    if (attribute.type === 'JSXAttribute' && propsName.includes(attribute.name.name)) {
      value[attribute.name.name] = attribute;
    } else {
      return attribute;
    }
  });
  return { value, attributes: newAttributes };
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

module.exports = function (fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);
  // RadioGroup remove renderFunction
  ast
    .find(j.JSXElement, { openingElement: { name: { name: 'RadioGroup' } } })
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

      return createJSXElement(j, path.value, '', false, children);
    });

  // replace `children` -> Radio.Text
  // added `Radio` -> Radio.Value
  ast.find(j.JSXElement, { openingElement: { name: { name: 'Radio' } } }).replaceWith((path) => {
    let hasRadioValue = false;
    let hasRadioText = false;
    // detection Radio.Value
    j(path)
      .find(j.JSXOpeningElement, {
        name: { object: { name: 'Radio' }, property: { name: 'Value' } },
      })
      .forEach(() => {
        hasRadioValue = true;
      });
    // detection Radio.Text
    j(path)
      .find(j.JSXOpeningElement, {
        name: { object: { name: 'Radio' }, property: { name: 'Text' } },
      })
      .forEach(() => {
        hasRadioText = true;
      });
    const Text = hasRadioText
      ? path.value.children
      : [createAddon(j, path.value.children, 'Radio.Text')];
    const Value = hasRadioValue ? [] : [createAddon(j, [], 'Radio.Value', true)];
    return createJSXElement(j, path.value, '', false, [...Value, ...Text]);
  });

  // migration all props, except [size, labelProps] `Radio` -> Radio.Value
  // replace invalid -> state="invalid"
  ast.find(j.JSXElement, { openingElement: { name: { name: 'Radio' } } }).replaceWith((path) => {
    let { value, attributes } = getNewAttributes(j, path.value.attributes, [
      'size',
      'labelProps',
      'invalid',
    ]);

    let attributesRadio = [];

    j(path)
      .find(j.JSXOpeningElement, {
        name: { object: { name: 'Radio' }, property: { name: 'Value' } },
      })
      .replaceWith((path) => {
        return j.jsxOpeningElement(path.value.name, attributes, true);
      });

    // size ['s', 'm', 'l'] -> ['m', 'l', 'xl']
    if (value['size']) {
      attributesRadio = [
        j.jsxAttribute(j.jsxIdentifier('size'), setValueSize(j, value['size'].value)),
      ];
    }

    if (value['invalid']) {
      attributesRadio = [
        ...attributesRadio,
        j.jsxAttribute(
          j.jsxIdentifier('state'),
          j.jsxExpressionContainer(
            j.conditionalExpression(
              value['invalid'].value.expression,
              j.literal('invalid'),
              j.literal('normal'),
            ),
          ),
        ),
      ];
    }

    if (value['labelProps']) {
      attributesRadio = [
        ...attributesRadio,

        ...value['labelProps'].value.expression.properties.reduce((acc, prop) => {
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
    return createJSXElement(j, path.value, '', attributesRadio);
  });

  return ast.toSource();
};
