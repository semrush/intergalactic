const REG = {
  LIB: /@semcore\//,
  SOURCE: /\/src(\/|$)/,
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "disallow import from 'src' directory of @semcore components",
      category: 'Possible Errors',
      recommended: true,
    },
  },
  create: function(context) {
    return {
      ImportDeclaration: function(node) {
        const { source } = node;
        if (REG.LIB.test(source.value) && REG.SOURCE.test(source.value)) {
          context.report({
            node: source,
            message: `Invalid import from @semcore component's src directory.`,
          });
        }
      },
    };
  },
};
