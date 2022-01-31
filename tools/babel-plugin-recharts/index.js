module.exports = function ({ types }) {
  return {
    visitor: {
      ImportDeclaration(path, { opts }) {
        const importPath = path.node.source.value;
        const pattern = opts.replacePattern;

        if (path.node.__processed__) return;
        if (!importPath.includes('recharts') || !importPath.includes(pattern[0])) return;

        const newNode = types.importDeclaration(
          path.node.specifiers,
          types.stringLiteral(importPath.replace(`/${pattern[0]}/`, `/${pattern[1]}/`)),
        );
        newNode.__processed__ = true;

        path.replaceWith(newNode);
      },
    },
  };
};
