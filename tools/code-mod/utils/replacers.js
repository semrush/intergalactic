const recast = require('recast');
const b = recast.types.builders;
const t = recast.types.namedTypes;

/**
 * Ф-ция для создания нового JSXElement-a вида <Link.Text>
 * @param {String} name - имя JSXElement-a
 * @param {Array} children - список дочерних элементов
 * @param {Array} attributes - список атрибутов
 * @returns {*}
 */
function createNestedJSXElement(name, children, attributes = []) {
  children = Array.isArray(children) ? children : [children];
  const [identifier1, identifier2] = name.split('.').map((str) => str.trim());
  const JSXElement = identifier2
    ? b.jsxMemberExpression(b.jsxIdentifier(identifier1), b.jsxIdentifier(identifier2))
    : b.jsxIdentifier(identifier1);
  const selfClosing = !Boolean(children.length);
  return b.jsxElement(
    b.jsxOpeningElement(JSXElement, attributes, selfClosing),
    !selfClosing ? b.jsxClosingElement(JSXElement) : null,
    children,
  );
}

/**
 * Ф-ция для "разворачивания" атрибутов before & after
 * @param path - NodePath
 * @returns {*}
 */
function beforeAfterReplacer(path, createWrapChildren = true) {
  const node = path.value;
  const { name, attributes } = node.openingElement;
  const props = { before: undefined, after: undefined };
  const propArr = Object.keys(props);
  propArr.forEach((prop) => {
    const attr = attributes.find((node) => node.name.name === prop);
    if (attr) {
      props[prop] = t.JSXExpressionContainer.check(attr.value)
        ? attr.value.expression
        : b.jsxExpressionContainer(attr.value);
    }
  });
  const { before, after } = props;

  return b.jsxElement(
    b.jsxOpeningElement(name, attributes.filter((node) => !propArr.includes(node.name.name))),
    node.closingElement,
    [
      before && b.jsxText('\n'),
      before && createNestedJSXElement(`${name.name}.Addon`, before),
      (before || after) && b.jsxText('\n'),
      (before || after) && createWrapChildren
        ? createNestedJSXElement(`${name.name}.Text`, node.children)
        : node.children,
      (before || after) && b.jsxText('\n'),
      after && createNestedJSXElement(`${name.name}.Addon`, after),
      after && b.jsxText('\n'),
    ]
      .reduce((acc, val) => acc.concat(val), [])
      .filter((i) => i !== undefined),
  );
}

/**
 * Ф-ция замены размеров компонента
 * @param {Object} map - map текущих размеров на новые
 * @returns {function(*): *}
 */
function sizeReplacer(map) {
  return function replacer(path) {
    const attrValue = path.value.value;
    const value = t.JSXExpressionContainer.check(attrValue)
      ? attrValue.expression.value
      : attrValue.value;
    return b.jsxAttribute(
      b.jsxIdentifier('size'),
      b.jsxExpressionContainer(b.numericLiteral(map[value])),
    );
  };
}

/**
 * Ф-ция добавляющая к JSX-element'у JSX-аргумент при его отсутствии
 * @param {String} name - имя атрибута
 * @param {String} newName - имя добавляемого атрибута
 * @param {function} value - ф-ция генератор ast-node'ы jsxAttribute.value
 * @returns {function(*): *}
 */
function addAttributeIfNotProvided(name, newName, value) {
  return function replacer(path) {
    const node = path.value;

    if (
      !t.JSXElement.check(node) ||
      !t.JSXOpeningElement.check(node.openingElement) ||
      node.openingElement.attributes.some((node) => node.name.name === name)
    ) {
      return node;
    }

    const attributes = [
      ...node.openingElement.attributes,
      b.jsxAttribute(
        b.jsxIdentifier(newName),
        value !== null ? b.jsxExpressionContainer(value) : value,
      ),
    ];

    return b.jsxElement(
      b.jsxOpeningElement(node.openingElement.name, attributes, node.openingElement.selfClosing),
      node.closingElement,
      node.children,
    );
  };
}

/**
 * Ф-ция рекурсивного переименования JSX-элемента
 * @param {String} name - новое имя JSX-элемента
 * @returns {function(*): *}
 */
function renameJSXElement(name) {
  return function replacer(path) {
    // hack to work with node, not nodePath. Useful for recursive version of function
    const node = path.parent ? path.value : path;
    if (!t.JSXElement.check(node)) return node;
    const { openingElement, closingElement, children } = node;
    const nodeName = t.JSXMemberExpression.check(openingElement.name)
      ? openingElement.name.object.name
      : openingElement.name.name;
    const nodeNameBuilder = t.JSXMemberExpression.check(openingElement.name)
      ? b.jsxMemberExpression(b.jsxIdentifier(name), openingElement.name.property)
      : b.jsxIdentifier(name);
    return b.jsxElement(
      b.jsxOpeningElement(nodeNameBuilder, openingElement.attributes, openingElement.selfClosing),
      closingElement ? b.jsxClosingElement(nodeNameBuilder) : null,
      children.map((path) => {
        const node = path.parent ? path.value : path;
        if (!t.JSXElement.check(node)) return node;
        const { openingElement } = node;
        const childNodeName = t.JSXMemberExpression.check(openingElement.name)
          ? openingElement.name.object.name
          : openingElement.name.name;
        if (nodeName !== childNodeName) return node;
        return replacer(path);
      }),
    );
  };
}

/**
 * Ф-ция удаления JSX-атрибутов
 * @param {String[]} names - имена удаляемых атрибутов
 * @returns {function(*): *}
 */
function removeJsxAttributes(names) {
  return function replacer(path) {
    const node = path.value;
    return b.jsxElement(
      b.jsxOpeningElement(
        node.openingElement.name,
        node.openingElement.attributes.filter((attr) => !names.includes(attr.name.name)),
        node.openingElement.selfClosing,
      ),
      node.closingElement,
      node.children,
    );
  };
}

/**
 * Ф-ция разворачивания св-в из labelProps
 * @param {JSXExpressionContainer} labelProps - значение атрибута
 * @returns {[attributes]}
 */
function spredLabelProps(labelProps) {
  return labelProps.expression.properties.reduce((acc, prop) => {
    if (t.Literal.check(prop.value)) {
      return (acc = [
        ...acc,
        b.jsxAttribute(b.jsxIdentifier(prop.key.name), b.literal(prop.value.value)),
      ]);
    }

    if (t.ObjectExpression.check(prop.value)) {
      return (acc = [
        ...acc,
        b.jsxAttribute(b.jsxIdentifier(prop.key.name), b.jsxExpressionContainer(prop.value)),
      ]);
    }
    return acc;
  }, []);
}

/**
 * Функция для создания новых атрибутов из имеющихся в JSXElement-e
 * @param {Object[]} attributes - атрибуты из ast
 * @param {String[]} propsName - список атрибутов, которые нужно убрать
 * @returns {value: Object[], attributes:Object[]} value - Object вида {[name attribute]: attribute.value},
 *                                       attributes - атрибуты из ast
 */
function getNewAttributes(attributes, propsName = []) {
  let value = {};
  if (!attributes.length) return { value, attributes };

  const newAttributes = attributes.filter((attribute) => {
    if (t.JSXAttribute.check(attribute) && propsName.includes(attribute.name.name)) {
      value[attribute.name.name] = attribute.value;
    } else {
      return attribute;
    }
  });

  return { value, attributes: newAttributes };
}

module.exports = {
  createNestedJSXElement,
  beforeAfterReplacer,
  sizeReplacer,
  addAttributeIfNotProvided,
  renameJSXElement,
  removeJsxAttributes,
  spredLabelProps,
  getNewAttributes,
};
