const path = require('path');
const syntaxJsx = require('@babel/plugin-syntax-jsx').default;
const { addNamed } = require('@babel/helper-module-imports');
const fs = require('fs-extra');
const postcss = require('./postcss');

const DEFAULT_OPTS = {};

function StylesPlugin({ types: t }, opts) {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  const processor = postcss(options);

  function getAttrKey(name) {
    if (t.isJSXNamespacedName(name)) {
      return name.namespace.name + ':' + name.name.name;
    } else {
      return name.name;
    }
  }

  function importProcessing(p, ident, cssPath) {
    const code = fs
      .readFileSync(cssPath)
      .toString()
      // escape backticks and backslashes
      .replace(/[`\\]/g, '\\$&');

    p.replaceWith(
      t.VariableDeclaration('const', [
        t.VariableDeclarator(
          t.Identifier(ident),
          t.TaggedTemplateExpression(
            t.MemberExpression(addNamed(p, 'sstyled', '@semcore/core'), t.Identifier('insert')),
            t.TemplateLiteral(
              [
                t.TemplateElement({
                  raw: code,
                  cooked: code,
                }),
              ],
              [],
            ),
          ),
        ),
      ]),
    );

    p.traverse({
      TaggedTemplateExpression(p) {
        cssProcessing(p, p.node, cssPath);
      },
    });
  }

  function cssProcessing(p, tag, from) {
    const { raw } = tag.quasi.quasis[0].value;
    const { css, messages } = processor.process(raw, {
      from,
      // to:
    });
    const { tokens, hash } = messages.find((m) => m.plugin === 'postcss-shadow-styles');

    const wrapBundlerComments = (node) => {
      t.addComment(node, 'leading', `__reshadow_css_start__`);
      t.addComment(node, 'trailing', `__reshadow_css_end__`);

      t.addComment(node.arguments[0], 'leading', `__inner_css_start__`);
      t.addComment(node.arguments[0], 'trailing', `__inner_css_end__`);
      return node;
    };

    p.replaceWith(
      t.SequenceExpression([
        wrapBundlerComments(
          t.CallExpression(p.node.tag, [
            t.StringLiteral(css),
            t.StringLiteral(hash + postcss.PLACEHOLDER_REPLACER),
          ]),
        ),
        t.ObjectExpression(
          Object.entries(tokens).map(([key, value]) =>
            t.ObjectProperty(t.StringLiteral(key), t.StringLiteral(value)),
          ),
        ),
      ]),
    );
    // p.addComment('leading', `__reshadow-styles__:"${source.value}"`);
  }

  function styledProcessing(p, ident) {
    const styledP = p.find((p) => p.node?.callee?.callee?.name === ident);
    if (!styledP) return;

    const styledIdent = p.scope.generateUidIdentifierBasedOnNode(ident);
    p.scope.push({ id: styledIdent });

    styledP.replaceWith(
      t.SequenceExpression([
        t.AssignmentExpression('=', styledIdent, styledP.node.callee),
        styledP.node.arguments[0],
      ]),
    );

    p.scope.path.traverse({
      JSXElement(p) {
        if (
          !t.isJSXIdentifier(p.node.openingElement.name) ||
          !p.scope.getOwnBinding(styledIdent.name)
        )
          return;

        p.node.openingElement.attributes = [
          t.JSXSpreadAttribute(
            t.CallExpression(t.MemberExpression(styledIdent, t.Identifier('cn')), [
              t.StringLiteral(p.node.openingElement.name.name),
              t.ObjectExpression(
                p.node.openingElement.attributes.reduce((acc, attr) => {
                  if (t.isJSXSpreadAttribute(attr)) {
                    acc.push(t.SpreadElement(attr.argument));
                  }
                  if (t.isJSXAttribute(attr)) {
                    const value = t.isJSXExpressionContainer(attr.value)
                      ? attr.value.expression
                      : attr.value;
                    acc.push(
                      t.ObjectProperty(
                        t.StringLiteral(getAttrKey(attr.name)),
                        value || t.BooleanLiteral(true),
                      ),
                    );
                  }
                  return acc;
                }, []),
              ),
            ]),
          ),
        ];
      },
    });
  }

  // TODO: это костыль, надо убрать когда переедем
  let INIT_SSTYLED = false;
  let timer;
  return {
    inherits: syntaxJsx,
    pre() {
      INIT_SSTYLED = false;
      clearTimeout(timer);
    },
    visitor: {
      ImportDeclaration(p, state) {
        const { source, specifiers } = p.node;
        if (source.value === '@semcore/core') {
          specifiers.forEach((specifier) => {
            if (specifier.imported?.name === 'sstyled') {
              INIT_SSTYLED = true;
              p.scope.getBinding(specifier.local.name)?.referencePaths.forEach((refP) => {
                if (t.isCallExpression(refP.container)) {
                  styledProcessing(refP, specifier.local.name);
                }
                if (
                  t.isMemberExpression(refP.container) &&
                  refP.container.property.name === 'css'
                ) {
                  const tagP = refP.find((p) => t.isTaggedTemplateExpression(p.container));
                  if (!tagP) return;
                  tagP.node.property = t.Identifier('insert');
                  cssProcessing(tagP.parentPath, tagP.container, state.filename);
                }
              });
            }
          });
        }
        if (INIT_SSTYLED && source.value.endsWith('.shadow.css')) {
          specifiers.forEach((specifier) => {
            if (t.isImportDefaultSpecifier(specifier)) {
              const cssPath = path.resolve(path.dirname(state.filename), source.value);
              importProcessing(p, specifier.local.name, cssPath);
              p.addComment('leading', `__reshadow-styles__:"${source.value}"`);
            }
          });
        }
      },
    },
  };
}

module.exports = StylesPlugin;
module.exports.postcss = postcss;
