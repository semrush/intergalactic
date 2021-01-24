const recast = require('recast');
const { plugin, filters } = require('../../../utils');
const { removeJsxAttributes } = require('../../../utils/replacers');
const { importFromModule, hasAnyOfAttributes } = filters;
const t = recast.types.namedTypes;
const b = recast.types.builders;

const MAP_DIRECTION_TO_SIZE_MAGIN_TEXT = {
  row: {
    xxs: 1,
    xs: 1,
    s: 2,
    m: 2,
    l: 2,
    xl: 4,
    xxl: 4,
  },
  column: {
    xxs: 1,
    xs: 1,
    s: 1,
    m: 2,
    l: 2,
    xl: 2,
    xxl: 2,
  },
};

const getValueAttributeName = (attr, name) => {
  if (t.JSXAttribute.check(attr) && t.JSXIdentifier.check(attr.name) && attr.name.name === name) {
    //"" or {""}
    return t.Literal.check(attr.value) ? attr.value.value : attr.value.expression.value;
  }
  return undefined;
};
module.exports = ({ source }, { jscodeshift: j }, { printOptions }) => {
  j.use(plugin);
  const ast = j(source);
  let tips = true;

  const Spinners = ast.findJSXElementByImportDefaultFromModule('@semcore/spin');
  // tip="..." to <Text>...</Text>
  Spinners.filter(hasAnyOfAttributes(['tip'])).replaceWith((path) => {
    const node = path.value;
    let size = 'm';
    let direction = 'row';
    let tip = '';
    // check size
    node.openingElement.attributes.forEach((attr) => {
      size = getValueAttributeName(attr, 'size') || size;
      direction = getValueAttributeName(attr, 'direction') || direction;
      tip = getValueAttributeName(attr, 'tip') || tip;
    });

    // add import tip from typography
    if (tips) {
      tips = false;
      ast
        .find(j.ImportDeclaration)
        .filter(importFromModule('@semcore/spin'))
        .insertAfter(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('Text'), j.identifier('Text'))],
            j.literal('@semcore/typography'),
          ),
        )
        .insertAfter(
          j.importDeclaration(
            [j.importSpecifier(j.identifier('Flex'), j.identifier('Flex'))],
            j.literal('@semcore/flex-box'),
          ),
        );
    }

    let attributes = [
      b.jsxAttribute(b.jsxIdentifier('inline')),
      b.jsxAttribute(b.jsxIdentifier('alignItems'), b.literal('center')),
      b.jsxAttribute(b.jsxIdentifier('justifyContent'), b.literal('center')),
    ];

    direction === 'column' &&
      attributes.push(b.jsxAttribute(b.jsxIdentifier('direction'), b.literal(direction)));

    return b.jsxElement(
      b.jsxOpeningElement(b.jsxIdentifier('Flex'), attributes),
      b.jsxClosingElement(b.jsxIdentifier('Flex')),
      [
        removeJsxAttributes(['tip', 'direction'])(path),
        b.jsxElement(
          b.jsxOpeningElement(b.jsxIdentifier('Text'), [
            b.jsxAttribute(b.jsxIdentifier('size'), b.jsxExpressionContainer(b.literal(200))),
            b.jsxAttribute(b.jsxIdentifier('color'), b.literal('gray60')),
            b.jsxAttribute(b.jsxIdentifier('tag'), b.literal('p')),
            direction === 'row'
              ? b.jsxAttribute(
                  b.jsxIdentifier('ml'),
                  b.jsxExpressionContainer(
                    b.literal(MAP_DIRECTION_TO_SIZE_MAGIN_TEXT[direction][size]),
                  ),
                )
              : b.jsxAttribute(
                  b.jsxIdentifier('mt'),
                  b.jsxExpressionContainer(
                    b.literal(MAP_DIRECTION_TO_SIZE_MAGIN_TEXT[direction][size]),
                  ),
                ),
          ]),
          b.jsxClosingElement(b.jsxIdentifier('Text')),
          [b.jsxText(tip)],
        ),
      ],
    );
  });

  return ast.toSource(printOptions || {});
};
