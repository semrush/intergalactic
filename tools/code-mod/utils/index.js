const recast = require('recast');
const t = recast.types.namedTypes;

/**
 * Фильтр по ImportDeclaration, проверяет наличие импорта из модуля
 * @param {String} moduleName - имя модуля
 * @returns {filter}
 */
function importFromModule(moduleName) {
  return function filter(path) {
    const node = path.value;
    if (!t.ImportDeclaration.check(node)) return false;
    return node.source.value === moduleName;
  };
}

/**
 * Фильтр по ImportDeclaration, проверяет наличие ImportDefault из модуля
 * @param {String} moduleName - имя модуля
 * @returns {function(*): boolean} - ф-ция фильтрации ast нод
 */
function importDefaultFromModule(moduleName) {
  return function filter(path) {
    const node = path.value;
    if (
      !t.ImportDeclaration.check(node) ||
      !t.ImportDefaultSpecifier.check(node.specifiers[0]) ||
      !t.Identifier.check(node.specifiers[0].local)
    ) {
      return false;
    }
    return node.source.value === moduleName;
  };
}

/**
 * Фильтр по ImportDeclaration, проверяет наличие именованного импорта из модуля
 * @param {String} moduleName - имя модуля
 * @param {String} variableName - имя переменноц
 * @returns {function(*): boolean} - ф-ция фильтрации ast нод
 */
function namedImportFromModule(moduleName, variableName) {
  return function filter(path) {
    const node = path.value;
    if (!t.ImportDeclaration.check(node) || node.source.value !== moduleName) {
      return false;
    }
    return node.specifiers.some((node) => {
      return t.ImportSpecifier.check(node) && node.imported.name === variableName;
    });
  };
}

/**
 * Фильтр для JSXElement, ищет ноды со всеми указанными именами атрибутов
 * @param {String[]} attributes - массив имен атрибутов
 * @returns {function(*): boolean} - ф-ция фильтрации ast нод
 */
function hasAllAttributes(attributes) {
  return function filter(path) {
    const node = path.value;
    if (!t.JSXElement.check(node)) {
      return false;
    }
    const nodeHasAttributes = new Set();
    node.openingElement.attributes.forEach((attr) => {
      if (t.JSXAttribute.check(attr) && t.JSXIdentifier.check(attr.name)) {
        nodeHasAttributes.add(attr.name.name);
      }
    });
    return attributes.every((attr) => nodeHasAttributes.has(attr));
  };
}

/**
 * Фильтр для JSXElement, ищет ноды со одним из указанных имен атрибутов
 * @param {String[]} attributes - массив имен атрибутов
 * @returns {function(*): boolean} - ф-ция фильтрации ast нод
 */
function hasAnyOfAttributes(attributes) {
  return function filter(path) {
    const node = path.value;
    if (!t.JSXElement.check(node)) {
      return false;
    }
    const nodeHasAttributes = new Set();
    node.openingElement.attributes.forEach((attr) => {
      if (t.JSXAttribute.check(attr) && t.JSXIdentifier.check(attr.name)) {
        nodeHasAttributes.add(attr.name.name);
      }
    });
    return attributes.some((attr) => nodeHasAttributes.has(attr));
  };
}

/**
 * Фильтр JSX-атрибутов по имени
 * @param {String} name - имя артибута
 * @returns {function(*): boolean}
 */
function attributeName(name) {
  return function filter(path) {
    return path.name.name === name;
  };
}

/**
 * Фильтр JSX-атрибутов по имени и значению
 * @param {String} name - имя артибута
 * @param {String} value - значение артибута
 * @returns {function(*): boolean}
 */
function attributeNameValue(name, value) {
  return function filter(path) {
    const val = t.JSXExpressionContainer.check(path.value) ? path.value.expression : path.value;
    if (val === null) {
      return path.name.name === name && val === value;
    }
    return path.name.name === name && val.value === value;
  };
}

/**
 * Фильтр для JSXElement, ищет все эл-ты с указанными артибутами
 * @param {Object} attributes - искомые атрибуты вида { name: values[] }
 * @returns {function(*): boolean}
 */
function jsxElementHasAttributes(attributes) {
  const attributeNames = Object.keys(attributes);
  return function filter(path) {
    if (!t.JSXElement.check(path.value)) {
      return false;
    }
    const elementAttributes = {};
    path.value.openingElement.attributes.forEach((attr) => {
      if (!t.JSXAttribute.check(attr) || !(attr.name.name in attributes)) return;
      elementAttributes[attr.name.name] = attr;
    });

    return attributeNames.every((name) => {
      if (!(name in attributes)) return false;
      if (!t.JSXAttribute.check(elementAttributes[name])) return false;
      const { value } = elementAttributes[name];
      const expectedValues = attributes[name];
      const actualValue = t.JSXExpressionContainer.check(value)
        ? value.expression.value
        : value.value;

      return expectedValues.includes(actualValue);
    });
  };
}

function findStyledJSXElements(variableName) {
  const styledSpecifier = this.find(t.ImportDeclaration)
    .filter(importDefaultFromModule('styled-components'))
    .find(t.ImportDefaultSpecifier)
    .paths();
  if (!styledSpecifier.length) return;
  const name = styledSpecifier[0].value.local && styledSpecifier[0].value.local.name;
  if (!name) return;
  return this.find(t.TaggedTemplateExpression)
    .filter((path) => {
      const node = path.value;
      if (!t.VariableDeclarator.check(path.parent.value)) return;
      if (!t.CallExpression.check(node.tag)) return;
      if (!t.Identifier.check(node.tag.callee)) return;
      if (node.tag.callee.name !== name) return;
      if (!node.tag.arguments.some((id) => id.name === variableName)) return;
      return true;
    })
    .map((path) => {
      const name = path.parent.value.id.name;
      return this.findJSXElements(name).paths();
    });
}

/**
 * Ищет все JSX-элементы (ImportDefault) из модуля
 * @param {String} moduleName - имя модуля
 * @returns {*}
 */
function findJSXElementByImportDefaultFromModule(moduleName) {
  if (!moduleName) return;
  return this.find(t.ImportDeclaration)
    .filter(importDefaultFromModule(moduleName))
    .map((path) => {
      const importDefaultSpec = path.value.specifiers.find((node) =>
        t.ImportDefaultSpecifier.check(node),
      );
      if (!importDefaultSpec) return;
      const { name } = importDefaultSpec.local;
      if (!name) return;
      const styled = findStyledJSXElements.call(this, name);
      return [...this.findJSXElements(name).paths(), ...((styled && styled.paths()) || [])];
    });
}

/**
 * Ищет все JSX-элементы (NamedImport) из модуля
 * @param {String} moduleName - имя модуля
 * @param {String} variableName - имя переменной
 * @returns {*}
 */
function findJSXElementByNamedImportFromModule(moduleName, variableName) {
  if (!moduleName || !variableName) return;
  return this.find(t.ImportDeclaration)
    .filter(namedImportFromModule(moduleName, variableName))
    .map((path) => {
      const specifier = path.value.specifiers
        .filter((node) => !t.ImportDefaultSpecifier.check(node))
        .find((node) => node.imported && node.imported.name === variableName);
      if (!specifier || !specifier.local.name || specifier.imported.name !== variableName) return;
      const { name } = specifier.local;
      const styled = findStyledJSXElements.call(this, name);
      return [...this.findJSXElements(name).paths(), ...((styled && styled.paths()) || [])];
    });
}

/**
 * Ищет local name именованого импорта из модуля
 * import { N as Whatever } from 'somewhere' => ['Whatever']
 * @param moduleName - имя модуля
 * @param variableName - имя импортируемой переменной
 * @returns {String[]}
 */
function getNamedImportLocalName(moduleName, variableName) {
  const names = [];
  this.find(t.ImportDeclaration)
    .filter(namedImportFromModule(moduleName, variableName))
    .map((path) => {
      const specifier = path.value.specifiers.find((node) => !t.ImportDefaultSpecifier.check(node));
      if (!specifier || !specifier.local.name || specifier.imported.name !== variableName) return;
      names.push(specifier.local.name);
    });
  return names;
}

/**
 * Ищет local name дефолтного импорта по из модуля
 * import { N as Whatever } from 'somewhere' => ['Whatever']
 * @param moduleName - имя модуля
 * @returns {String[]}
 */
function getImportDefaultLocalName(moduleName) {
  const names = [];
  this.find(t.ImportDeclaration)
    .filter(importDefaultFromModule(moduleName))
    .map((path) => {
      const specifier = path.value.specifiers.find((node) => !t.ImportSpecifier.check(node));
      if (!specifier || !specifier.local.name) return;
      names.push(specifier.local.name);
    });
  return names;
}

const globalMethods = {
  getNamedImportLocalName,
  getImportDefaultLocalName,
  findJSXElementByImportDefaultFromModule,
  findJSXElementByNamedImportFromModule,
};

const filters = {
  importFromModule,
  importDefaultFromModule,
  namedImportFromModule,
  hasAllAttributes,
  hasAnyOfAttributes,
  attributeName,
  attributeNameValue,
  jsxElementHasAttributes,
};

exports.filters = filters;
exports.globalMethods = globalMethods;
exports.plugin = function(j) {
  j.registerMethods(globalMethods);
};
