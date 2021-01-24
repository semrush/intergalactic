const { plugin, filters } = require('../../../utils');
const {
  sizeReplacer,
  addAttributeIfNotProvided,
  renameJSXElement,
} = require('../../../utils/replacers');
const { attributeName, importFromModule, jsxElementHasAttributes } = filters;
const sizeDependentReplacer = require('./sizeDependentReplacer');

module.exports = ({ source }, { jscodeshift: j }, { printOptions }) => {
  j.use(plugin);
  const ast = j(source);

  const SIZE_MAP = { m: 100, l: 200, xl: 300 };

  // Text
  const Text = ast.findJSXElementByNamedImportFromModule('@semcore/typography', 'Text');
  Text.find(j.JSXAttribute, attributeName('size')).replaceWith(sizeReplacer(SIZE_MAP));
  Text.replaceWith(addAttributeIfNotProvided('size', 'size', j.numericLiteral(100)));

  const textNames = ast.getNamedImportLocalName('@semcore/typography', 'Text');
  const TextLocalName = textNames.length ? textNames[0] : 'Text';

  // Paragraph
  const P = ast.findJSXElementByNamedImportFromModule('@semcore/typography', 'P');
  P.replaceWith(addAttributeIfNotProvided('tag', 'tag', j.literal('p')));
  P.replaceWith(addAttributeIfNotProvided('gutterBottom', 'm', j.numericLiteral(0)));
  P.find(j.JSXAttribute, attributeName('size')).replaceWith(sizeReplacer(SIZE_MAP));
  P.replaceWith(addAttributeIfNotProvided('size', 'size', j.numericLiteral(100)));
  P.find(j.JSXAttribute, attributeName('gutterBottom')).replaceWith(
    sizeDependentReplacer('m', {
      100: '0 0 18px 0',
      200: '0 0 20px 0',
      300: '0 0 24px 0',
    }),
  );
  P.replaceWith(renameJSXElement(TextLocalName));

  // Headings
  const H = ast.findJSXElementByNamedImportFromModule('@semcore/typography', 'H');
  H.find(j.JSXAttribute, attributeName('size')).replaceWith(
    sizeReplacer({
      1: 800,
      2: 700,
      3: 600,
      4: 500,
      5: 400,
      6: 300,
      7: 300,
    }),
  );
  H.replaceWith(addAttributeIfNotProvided('gutterBottom', 'm', j.numericLiteral(0)));
  H.find(j.JSXAttribute, attributeName('gutterBottom')).replaceWith(
    sizeDependentReplacer('m', {
      800: '0 0 24px 0',
      700: '0 0 16px 0',
      600: '0 0 16px 0',
      500: '0 0 12px 0',
      400: '0 0 12px 0',
      300: '0 0 8px 0',
    }),
  );
  H.replaceWith(addAttributeIfNotProvided('tag', 'tag', j.literal('h')))
    .find(j.JSXAttribute, attributeName('tag'))
    .replaceWith(
      sizeDependentReplacer('tag', {
        800: 'h1',
        700: 'h2',
        600: 'h3',
        500: 'h4',
        400: 'h5',
        300: 'h6',
      }),
    );
  H.filter(jsxElementHasAttributes({ size: [800, 700] })).replaceWith(
    addAttributeIfNotProvided('bold', 'bold', null),
  );
  H.filter(jsxElementHasAttributes({ size: [600, 500, 400, 300] })).replaceWith(
    addAttributeIfNotProvided('medium', 'medium', null),
  );
  H.replaceWith(renameJSXElement(TextLocalName));

  ast
    .find(j.ImportDeclaration)
    .filter(importFromModule('@semcore/typography'))
    .replaceWith(
      j.importDeclaration(
        [j.importSpecifier(j.identifier(TextLocalName), j.identifier('Text'))],
        j.literal('@semcore/typography'),
      ),
    );

  return ast.toSource(printOptions || {});
};
