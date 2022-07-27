const syntaxJsx = require('@babel/plugin-syntax-jsx').default;
const { addNamed } = require('@babel/helper-module-imports');

const DEFAULT_OPTS = {
  fieldAssign: 'asProps',
  source: '@semcore/core',
};

function RootPlugin({ types: t }, opts) {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  function getAttrKey(name) {
    if (t.isJSXNamespacedName(name)) {
      return name.namespace.name + ':' + name.name.name;
    } else {
      return name.name;
    }
  }

  return {
    inherits: syntaxJsx,
    visitor: {
      ImportDeclaration(p) {
        const { source, specifiers } = p.node;
        if (source.value !== options.source) return;

        specifiers.forEach((specifier) => {
          if (specifier.imported?.name !== 'Root') return;

          p.scope.getBinding(specifier.local.name)?.referencePaths.forEach((refP) => {
            if (!t.isVariableDeclarator(refP.container) && !t.isJSXOpeningElement(refP.container))
              return;

            let propsVal;
            const propsIdent = refP.scope.generateUidIdentifierBasedOnNode('props');
            const nearestParentFunction = refP.scope.getFunctionParent()?.block;
            const deepParentClassMethod = refP.findParent((path) => path.isClassMethod());

            if (
              deepParentClassMethod?.type === 'ClassMethod' &&
              nearestParentFunction?.type !== 'FunctionDeclaration' &&
              nearestParentFunction?.type !== 'ArrowFunctionExpression' &&
              nearestParentFunction?.type !== 'FunctionExpression'
            ) {
              propsVal = t.MemberExpression(t.ThisExpression(), t.Identifier(options.fieldAssign));
            } else if (
              refP.scope.parent.block.type === 'Program' &&
              (nearestParentFunction?.type === 'FunctionDeclaration' ||
                nearestParentFunction?.type === 'ArrowFunctionExpression' ||
                nearestParentFunction?.type === 'FunctionExpression')
            ) {
              propsVal = t.Identifier('arguments[0]');
            } else {
              throw new Error(
                `Root does not support such placement, use it inside functional components or class methods`,
              );
            }
            refP.scope.push({
              id: propsIdent,
              init: propsVal,
            });
            const nameJSX = refP.container.id?.name || refP.container.name?.name;
            refP.scope.path.traverse({
              JSXElement(p) {
                if (nameJSX !== p.node.openingElement.name.name) return;

                let name = t.StringLiteral('div');

                p.node.openingElement.attributes = [
                  t.JSXSpreadAttribute(
                    t.CallExpression(addNamed(p, 'assignProps', options.source), [
                      t.ObjectExpression(
                        p.node.openingElement.attributes.reduce((acc, attr) => {
                          if (t.isJSXSpreadAttribute(attr)) {
                            acc.push(t.SpreadElement(attr.argument));
                          }
                          if (t.isJSXAttribute(attr)) {
                            const value = t.isJSXExpressionContainer(attr.value)
                              ? attr.value.expression
                              : attr.value;
                            if (attr.name.name === 'render') {
                              name = value;
                            } else {
                              acc.push(
                                t.ObjectProperty(
                                  t.StringLiteral(getAttrKey(attr.name)),
                                  value || t.BooleanLiteral(true),
                                ),
                              );
                            }
                          }
                          return acc;
                        }, []),
                      ),
                      propsIdent,
                    ]),
                  ),
                ];

                if (t.isVariableDeclarator(refP.container)) {
                  p.scope.getBinding(p.node.openingElement.name.name).path.node.init = name;
                }
                if (t.isJSXOpeningElement(refP.container)) {
                  p.node.openingElement.name = name;
                  if (p.node.closingElement) {
                    p.node.closingElement.name = p.node.openingElement.name;
                  }
                }
              },
            });
          });
        });
      },
    },
  };
}

module.exports = RootPlugin;
