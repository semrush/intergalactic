const fs = require('fs');
const path = require('path');
const parse = require('./process');

const RESHADOW_MAGIC_COMMENTS = {
  CSS_START: '__reshadow_css_start__',
  CSS_END: '__reshadow_css_end__',
  INNER_CSS: '__inner_css_start__',
  FILE_PATH: '__reshadow-styles__',
};

const RESOLVED_THEMES_MAP = new Map();

function getPkgNameFromFilePath(filepath, opts) {
  const scope = opts.scope || '@semcore';
  const match = filepath.match(new RegExp('\\' + `${scope}\\/[\\w\\-]+`, 'g'));
  if (!match) return;
  return match[match.length - 1].replace(new RegExp('\\' + `${scope}/`), '');
}

function resolveTheme(theme) {
  if (!theme) return;
  const fromCache = RESOLVED_THEMES_MAP.get(theme);
  if (fromCache) {
    return fromCache;
  }

  let themePath;
  try {
    const pkgMain = require.resolve(theme);
    themePath = path.join(path.dirname(pkgMain), 'components');
  } catch (e) {
    themePath = path.resolve(process.cwd(), theme);
    fs.statSync(themePath);
  }
  if (!fs.existsSync(themePath)) {
    return;
  }
  const resolvedTheme = {
    themePath,
    meta: createThemeMeta(themePath),
  };
  RESOLVED_THEMES_MAP.set(theme, resolvedTheme);
  return resolvedTheme;
}

function createThemeMeta(themeAbsolutePath) {
  const components = fs.readdirSync(themeAbsolutePath);
  return components.reduce((acc, component) => {
    if (!Object.hasOwnProperty.call(acc, component)) {
      acc[component] = {};
    }

    const componentCss = fs.readdirSync(path.resolve(themeAbsolutePath, component));

    componentCss.map((css) => {
      acc[component][css] = path.resolve(themeAbsolutePath, component, css);
    });

    return acc;
  }, {});
}

function getThemeCssPathsList(baseStyles, theme) {
  const { themeMeta, pkgName, cssFileName } = theme;
  const themeCssPaths = themeMeta.reduce((acc, meta) => {
    if (!meta[pkgName]) return acc;
    if (!meta[pkgName][cssFileName]) return acc;
    acc.push(meta[pkgName][cssFileName]);
    return acc;
  }, []);
  return themeCssPaths.length ? [baseStyles, ...themeCssPaths] : undefined;
}

/**
 * pluginOptions: {
 *   media: boolean,
 *   theme: packageName (@semcore/theme-sellerly),
 *   pkgName: string (for tests, ignore & don't describe),
 *   purgeCSS: Object, purgeCSS config object - http://rbtech.github.io/css-purge/,
 *   verbose: writes plugin's output to stdout
 * }
 */
module.exports = function({ types: t }, pluginOptions) {
  function log(msg, level = 'info') {
    if (pluginOptions.verbose) {
      console[level]('[@semcore/babel-plugin-react-semcore] ' + msg);
    }
  }

  function containsReshadowMagicComment(node) {
    const { leadingComments } = node;
    if (!Array.isArray(leadingComments)) return;
    if (!leadingComments.length) return;
    const { value } = leadingComments[0];
    return (
      value.includes(RESHADOW_MAGIC_COMMENTS.CSS_START) ||
      value.includes(RESHADOW_MAGIC_COMMENTS.FILE_PATH)
    );
  }

  function getCssFilePathFromComment(node) {
    if (!containsReshadowMagicComment(node)) return;
    const { leadingComments } = node;
    const { value } = leadingComments[0];
    const [magicComment, filepath] = value.split(':');
    if (magicComment !== RESHADOW_MAGIC_COMMENTS.FILE_PATH) return;
    return filepath.replace(/"/g, '');
  }

  function getBaseCssPath(node, currentFileName) {
    const relativeCssPath = getCssFilePathFromComment(node);
    if (!relativeCssPath) return;
    return path.join(path.dirname(currentFileName), relativeCssPath);
  }

  function findParentIfStatement(path) {
    if (!t.isIfStatement(path)) return;
    const { node } = path;
    if (node.test.type !== 'BooleanLiteral' && node.test.value !== false) return;
    return path;
  }

  function toObjectExpression(obj) {
    return t.objectExpression(
      Object.entries(obj).map(([key, value]) =>
        t.objectProperty(
          t.stringLiteral(key),
          t.templateLiteral(
            [
              t.templateElement({
                raw: value,
                cooked: value,
              }),
            ],
            [],
          ),
        ),
      ),
    );
  }

  function replaceWithNewStyles(node, styles, tokens, hash) {
    const { expressions } = node;
    const [cssCall, oldCssModulesMap] = expressions;
    if (cssCall.type !== 'CallExpression' || oldCssModulesMap.type !== 'ObjectExpression') return;
    const stylesLiteral = t.stringLiteral(styles);
    t.addComment(stylesLiteral, 'leading', RESHADOW_MAGIC_COMMENTS.INNER_CSS);
    node.expressions[0].arguments[0] = stylesLiteral;
    node.expressions[0].arguments[1] = t.stringLiteral(hash + parse.PLACEHOLDER_REPLACER);
    const map = toObjectExpression(tokens);
    t.addComment(map, 'leading', RESHADOW_MAGIC_COMMENTS.CSS_END);
    node.expressions[1] = map;
  }

  function isValidStyles(styles) {
    if (!styles) return false;
    return styles.init.type === 'SequenceExpression' && containsReshadowMagicComment(styles.init);
  }

  return {
    pre() {
      let { theme } = pluginOptions;
      if (!Array.isArray(theme)) theme = [theme];
      this.themeMeta = theme.reduce((acc, theme) => {
        const resolvedTheme = resolveTheme(theme);
        if (resolvedTheme) {
          const { themePath, meta } = resolvedTheme;
          log(`Resolved theme path: "${themePath}"`);
          acc.push(meta);
        }
        return acc;
      }, []);
    },
    visitor: {
      // media styles expression statement
      // ExpressionStatement(p) {
      //   const { node } = p;
      //   if (!containsReshadowMagicComment(node)) return;
      //   const parentPath = p.findParent(findParentIfStatement);
      //   if (!parentPath) return;
      //   if (!pluginOptions.media || (pluginOptions.media && pluginOptions.theme)) {
      //     parentPath.remove();
      //   } else {
      //     parentPath.replaceWith(p);
      //   }
      // },
      // styles inject & css-modules map declaration
      VariableDeclaration(p, state) {
        const { node } = p;
        if (!this.themeMeta.length || !pluginOptions.theme) return;
        if (!containsReshadowMagicComment(node)) return;
        const styles = node.declarations[0];
        if (!isValidStyles(styles)) return;
        const pkgName =
          getPkgNameFromFilePath(state.file.opts.filename, pluginOptions) || state.opts.pkgName;
        const cssPath = getBaseCssPath(node, state.file.opts.filename);
        if (!cssPath || !pkgName) return;
        const cssFileName = path.basename(cssPath);
        const themeCssPaths = getThemeCssPathsList(cssPath, {
          themeMeta: this.themeMeta,
          pkgName,
          cssFileName,
        });

        if (!themeCssPaths) return;

        const { css, tokens, hash } = parse(themeCssPaths, pluginOptions);
        replaceWithNewStyles(styles.init, css, tokens, hash);

        t.addComment(
          node,
          'leading',
          `${RESHADOW_MAGIC_COMMENTS.FILE_PATH}:"${path.relative(
            path.dirname(state.file.opts.filename),
            themeCssPaths[themeCssPaths.length - 1],
          )}"`,
        );
      },
    },
  };
};
