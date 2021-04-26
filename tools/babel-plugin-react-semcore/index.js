const fs = require('fs');
const path = require('path');
const semver = require('semver');
const parse = require('./process');

const RESHADOW_MAGIC_COMMENTS = {
  CSS_START: '__reshadow_css_start__',
  FILE_PATH: '__reshadow-styles__',
};

const RESOLVED_THEMES_MAP = new Map();

function getPkgNameFromFilePath(filepath, scope) {
  const reg = new RegExp(`/${scope}/(.+?)/`, 'g');
  const match = filepath.match(reg);
  if (!match) return;
  return match[match.length - 1].replace(reg, '$1');
}

function getPkgJsonFromPkgName(filepath, pkgName, scope) {
  const reg = new RegExp(`/${scope}/${pkgName}/`);
  const match = filepath.match(reg);
  if (!match) return;
  return filepath.substr(0, match.index + match[0].length) + 'package.json';
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
    const configPath = path.resolve(themeAbsolutePath, component, 'versions.json');
    if (!Object.hasOwnProperty.call(acc, component)) {
      acc[component] = {};
      if (fs.existsSync(configPath)) {
        const config = require(configPath);
        Object.entries(config).map(([v, s]) => {
          acc[component][v] = {};
          Object.entries(s).map(([css, p]) => {
            acc[component][v][css] = path.resolve(themeAbsolutePath, component, p);
          });
        });
      } else {
        acc[component]['*'] = {};
        const componentCss = fs
          .readdirSync(path.resolve(themeAbsolutePath, component))
          .filter((s) => s.endsWith('.css'));
        componentCss.map((css) => {
          acc[component]['*'][css] = path.resolve(themeAbsolutePath, component, css);
        });
      }
    }

    return acc;
  }, {});
}

function getThemeCssPathsList(baseStyles, theme) {
  const { themeMeta, pkgName, pkgJsonPath, cssFileName } = theme;

  const themeCssPaths = themeMeta.reduce((acc, meta) => {
    if (!meta[pkgName]) return acc;
    if (meta[pkgName]['*']) {
      if (meta[pkgName]['*'][cssFileName]) {
        acc.push(meta[pkgName]['*'][cssFileName]);
      }
    } else {
      const { version } = require(pkgJsonPath);
      Object.entries(meta[pkgName]).forEach(([v, css]) => {
        if (css[cssFileName] && semver.satisfies(version, v)) {
          acc.push(css[cssFileName]);
        }
      });
    }
    return acc;
  }, []);
  return themeCssPaths.length ? [baseStyles, ...themeCssPaths] : undefined;
}

/**
 * options: {
 *   theme: packageName (@semcore/theme-sellerly),
 *   score: string,
 *   postcss: Object,
 *   purgeCSS: Object, purgeCSS config object - http://rbtech.github.io/css-purge/,
 *   verbose: writes plugin's output to stdout
 * }
 */
const DEFAULT_OPTIONS = {
  scope: '@semcore',
  postcss: {},
  purgeCSS: {},
};
module.exports = function({ types: t }, opts) {
  const options = Object.assign({}, DEFAULT_OPTIONS, opts);

  function log(msg, level = 'info') {
    if (options.verbose) {
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

  function copyComment(oldNode, cb) {
    const leadingComments = (oldNode.leadingComments || []).map((c) => c.value);
    const trailingComments = (oldNode.trailingComments || []).map((c) => c.value);
    t.removeComments(oldNode);
    const newNode = cb();
    leadingComments.forEach((c) => t.addComment(newNode, 'leading', c));
    trailingComments.forEach((c) => t.addComment(newNode, 'trailing', c));
  }

  function replaceWithNewStyles(node, styles, tokens, hash) {
    const { expressions } = node;
    const [cssCall, cssModulesMap] = expressions;
    if (cssCall.type !== 'CallExpression' || cssModulesMap.type !== 'ObjectExpression') return;

    copyComment(
      node.expressions[0].arguments[0],
      () => (node.expressions[0].arguments[0] = t.StringLiteral(styles)),
    );
    node.expressions[0].arguments[1] = t.stringLiteral(hash + parse.PLACEHOLDER_REPLACER);
    node.expressions[1] = toObjectExpression(tokens);
  }

  function isValidStyles(styles) {
    if (!styles) return false;
    return styles.init.type === 'SequenceExpression' && containsReshadowMagicComment(styles.init);
  }

  return {
    pre() {
      let { theme } = options;
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
      VariableDeclaration(p, state) {
        const { node } = p;
        if (!this.themeMeta.length || !options.theme) return;
        if (!containsReshadowMagicComment(node)) return;
        const styles = node.declarations[0];
        if (!isValidStyles(styles)) return;
        const pkgName = getPkgNameFromFilePath(state.file.opts.filename, options.scope);
        const pkgJsonPath = getPkgJsonFromPkgName(state.file.opts.filename, pkgName, options.scope);
        const cssPath = getBaseCssPath(node, state.file.opts.filename);
        if (!cssPath || !pkgName) return;
        const cssFileName = path.basename(cssPath);
        const themeCssPaths = getThemeCssPathsList(cssPath, {
          themeMeta: this.themeMeta,
          pkgJsonPath,
          pkgName,
          cssFileName,
        });

        if (!themeCssPaths) return;

        const { css, tokens, hash } = parse(themeCssPaths, options);
        replaceWithNewStyles(styles.init, css, tokens, hash);
      },
    },
  };
};
