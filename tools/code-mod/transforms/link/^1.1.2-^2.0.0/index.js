const { plugin, filters } = require('../../../utils');
const {
  beforeAfterReplacer,
  sizeReplacer,
  renameJSXElement,
  removeJsxAttributes,
} = require('../../../utils/replacers');
const {
  hasAnyOfAttributes,
  attributeName,
  attributeNameValue,
  jsxElementHasAttributes,
  importFromModule,
  namedImportFromModule,
} = filters;

module.exports = ({ source }, { jscodeshift: j }, { printOptions }) => {
  j.use(plugin);
  const ast = j(source);

  const linkNames = ast.getImportDefaultLocalName('@semcore/link');
  const LinkLocalName = linkNames.length ? linkNames[0] : 'ScLink';

  ast
    .findJSXElementByNamedImportFromModule('@semcore/link', 'LinkCore')
    .replaceWith(renameJSXElement(LinkLocalName));

  ast
    .find(j.ImportDeclaration)
    .filter(namedImportFromModule('@semcore/link', 'LinkCore'))
    .replaceWith(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier(LinkLocalName))],
        j.literal('@semcore/link'),
      ),
    );

  const Links = ast.findJSXElementByImportDefaultFromModule('@semcore/link');

  // before/after
  Links.filter(hasAnyOfAttributes(['before', 'after'])).replaceWith((path) =>
    beforeAfterReplacer(path),
  );

  // sizes
  Links.find(j.JSXAttribute, attributeName('size')).replaceWith(
    sizeReplacer({ m: 100, l: 200, xl: 300 }),
  );

  // remove theme="default"
  Links.find(j.JSXAttribute, attributeNameValue('theme', 'default')).remove();
  // theme="invert" to color
  Links.find(j.JSXAttribute, attributeNameValue('theme', 'invert')).replaceWith(
    j.jsxAttribute(j.jsxIdentifier('color'), j.literal('#66ccf7')),
  );
  // use="hint" to <Hint />
  const Hints = Links.filter(jsxElementHasAttributes({ use: ['hint'] }));
  Hints.replaceWith(renameJSXElement('Hint'));
  Hints.replaceWith(removeJsxAttributes(['use', 'color']));

  // add import hint from typography
  if (Hints.length) {
    ast
      .find(j.ImportDeclaration)
      .filter(importFromModule('@semcore/link'))
      .insertAfter(
        j.importDeclaration(
          [j.importSpecifier(j.identifier('Hint'), j.identifier('Hint'))],
          j.literal('@semcore/typography'),
        ),
      );
  }

  return ast.toSource(printOptions || {});
};
