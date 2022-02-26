/**
 * Used instead of postcss-preset-env/custom-properties with preserve=false due to
 * https://github.com/postcss/postcss-custom-properties/issues/233
 *
 * Part of code is based on Based on https://github.com/postcss/postcss-custom-properties/
 */
const valuesParser = require('postcss-value-parser');

function transformValueAST(root, customProperties) {
  const handleNode = (node, handledNames = new Set()) => {
    if (isVarFunction(node)) {
      const [propertyNode, ...fallbacks] = node.nodes.filter((node) => node.type !== 'div');
      const { value: name } = propertyNode;

      if (handledNames.has(name)) {
        const applyStack = `${[...handledNames].join(' -> ')} -> ${name}`;
        throw new Error(
          `Recursive apply of css custom property ${name} found. (apply stack ${applyStack})`,
        );
      }

      if (name in Object(customProperties)) {
        node.type = 'decl';
        node.nodes = customProperties[name].nodes;
        handledNames.add(name);
        node.nodes.forEach((node) => handleNode(node, handledNames));
      } else if (fallbacks.length && fallbacks.every((fallback) => fallback.type !== 'function')) {
        node.nodes = fallbacks;
      }
    }
  };
  root.walk((node) => handleNode(node));

  return root.toString();
}

// match var() functions
const varRegExp = /^var$/i;

// whether the node is a var() function
const isVarFunction = (node) =>
  node.type === 'function' && varRegExp.test(node.value) && Object(node.nodes).length > 0;

const processed = Symbol('processed');

// match html and :root rules
const htmlSelectorRegExp = /^html$/i;
const rootSelectorRegExp = /^:root$/i;
const customPropertyRegExp = /^--[A-z][\w-]*$/;

// whether the node is an html or :root rule
const isHtmlRule = (node) =>
  node.type === 'rule' &&
  node.selector.split(',').some((item) => htmlSelectorRegExp.test(item)) &&
  Object(node.nodes).length;
const isRootRule = (node) =>
  node.type === 'rule' &&
  node.selector.split(',').some((item) => rootSelectorRegExp.test(item)) &&
  Object(node.nodes).length;

const isBlockIgnored = (ruleOrDeclaration) => {
  var rule = ruleOrDeclaration.selector ? ruleOrDeclaration : ruleOrDeclaration.parent;

  return /(!\s*)?postcss-custom-properties:\s*off\b/i.test(rule.toString());
};

// whether the node is an custom property
const isCustomDecl = (node) => node.type === 'decl' && customPropertyRegExp.test(node.prop);

// whether the node is a parent without children
const isEmptyParent = (node) => Object(node.nodes).length === 0;

module.exports = (opts) => {
  let customProperties = {};

  return {
    postcssPlugin: 'postcss-inline-css-variables',
    prepare(result) {
      return {
        /**
         *
         */
        Once: (root) => {
          // initialize custom selectors
          const customPropertiesFromHtmlElement = {};
          const customPropertiesFromRootPseudo = {};

          // for each html or :root rule
          root.nodes.slice().forEach((rule) => {
            const customPropertiesObject = isHtmlRule(rule)
              ? customPropertiesFromHtmlElement
              : isRootRule(rule)
              ? customPropertiesFromRootPseudo
              : null;

            // for each custom property
            if (customPropertiesObject) {
              rule.nodes.slice().forEach((decl) => {
                if (isCustomDecl(decl) && !isBlockIgnored(decl)) {
                  const { prop } = decl;

                  // write the parsed value to the custom property
                  customPropertiesObject[prop] = valuesParser(decl.value);

                  decl.remove();
                }
              });

              if (isEmptyParent(rule) && !isBlockIgnored(rule)) {
                rule.remove();
              }
            }
          });

          customProperties = {
            ...customPropertiesFromHtmlElement,
            ...customPropertiesFromRootPseudo,
          };
        },
        Declaration: (declaration) => {
          if (!declaration[processed]) {
            if (declaration.value.includes('var(')) {
              declaration.value = transformValueAST(
                valuesParser(declaration.value),
                customProperties,
              );
              declaration[processed] = true;
            }
          }
        },
      };
    },
  };
};

module.exports.postcss = true;
