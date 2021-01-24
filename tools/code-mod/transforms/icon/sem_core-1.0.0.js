const iconsReg = /sem-core\/lib\/Icon\/(xxs|xs|s|m|l|xl|pay)\//;

function generateNewPath(path) {
  const splited = path.split('/');
  const group = splited[3];
  let name = splited[4];

  // Замена стандартных переименованных иконок
  switch (name) {
    case 'MailAlt':
      name = 'MailOutline';
      break;
    case 'InfoChar':
      name = 'Info';
      break;
    case 'BulbAlt':
      name = 'Bulb';
      break;
  }

  // Замена иконок, переехавших в external
  switch (name) {
    case 'PinterestSave':
      return '@semcore/icon/lib/external/PinterestSave';
    case 'Retweet':
      return '@semcore/icon/lib/external/TwitterRetweet';
  }

  // Замена платежных иконок
  if (group === 'pay') {
    switch (name) {
      case 'Union':
        name = 'UnionPay';
        break;
      case 'Amex':
        name = 'AmericanExpress';
        break;
    }
    return `@semcore/icon/lib/${group}/${name}`;
  }
  return `@semcore/icon/lib/${name}/${group}`;
}

module.exports = (file, api, options) => {
  const j = api.jscodeshift;

  const ComponentsLocals = new Set();
  const ast = j(file.source);

  // replace imports
  ast
    .find(j.ImportDeclaration)
    .filter((p) => {
      const importPath = p.value.source.value;
      return iconsReg.test(importPath);
    })
    .replaceWith((p) => {
      const importPath = p.value.source.value;
      const importName = p.value.specifiers[0].local.name;
      ComponentsLocals.add(importName);
      const newPath = generateNewPath(importPath);
      return j.importDeclaration(p.node.specifiers, j.literal(newPath));
    });

  if (!options.appendClassName) {
    return ast.toSource();
  }

  // add className attribute
  ast
    .find(j.JSXOpeningElement)
    .filter((p) => {
      const name = p.node.name.name;
      return ComponentsLocals.has(name);
    })
    .replaceWith((p) => {
      const { attributes } = p.node;
      const { appendClassName } = options;

      const currentClassName = attributes.filter((node) => node.name.name === 'className');

      let newClassName = '';

      if (currentClassName.length) {
        if (currentClassName[0].value.type !== 'Literal') {
          console.error(
            `Can't append className to JSX element. Element identifier: ${p.node.name.name}. File path: ${file.path}`,
          );
          return p.node;
        }
        newClassName = currentClassName[0].value.value + ' ';
      }

      const classNameAttr = j.jsxAttribute(
        j.jsxIdentifier('className'),
        j.literal(newClassName + appendClassName),
      );

      return j.jsxOpeningElement(
        p.node.name,
        attributes.filter((node) => node.name.name !== 'className').concat(classNameAttr),
        p.node.selfClosing,
      );
    });

  return ast.toSource();
};
