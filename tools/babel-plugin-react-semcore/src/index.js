const fs = require('fs');
const path = require('path');
const semver = require('semver');
const finderPackageJson = require('find-package-json');
const parse = require('./process');
const getColorVars = require('./utils/vars');

const RESHADOW_MAGIC_COMMENTS = {
  CSS_START: '__reshadow_css_start__',
  FILE_PATH: '!__reshadow-styles__',
};

const SEMCORE_MAGIC_COMMENTS = {
  CSS_START: '__semcore-vars__',
};

const RESOLVED_THEMES_MAP = new Map();

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
  const components = fs
    .readdirSync(themeAbsolutePath, { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((f) => f.name);

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

function getThemeCssPathsList(theme) {
  const { themeMeta, pkgName, pkgVersion, cssFileName, scope } = theme;
  const name = pkgName.replace(new RegExp(`^${scope}/`), '');

  const themeCssPaths = themeMeta.reduce((acc, meta) => {
    if (!meta[name]) return acc;
    if (meta[name]['*']) {
      if (meta[name]['*'][cssFileName]) {
        acc.push(meta[name]['*'][cssFileName]);
      }
    } else {
      Object.entries(meta[name]).forEach(([v, css]) => {
        if (css[cssFileName] && semver.satisfies(pkgVersion, v)) {
          acc.push(css[cssFileName]);
        }
      });
    }
    return acc;
  }, []);

  return themeCssPaths.length ? themeCssPaths : undefined;
}

/**
 * options: {
 *   theme: packageName (@semcore/theme-sellerly),
 *   score: string,
 *   postcss: Object,
 *   verbose: writes plugin's output to stdout
 * }
 */
const DEFAULT_OPTIONS = {
  scope: '@semcore',
  postcss: {},
  findPackage: (filename) => {
    return finderPackageJson(filename).next().value;
  },
};

module.exports = function ({ types: t }, opts) {
  const options = Object.assign({}, DEFAULT_OPTIONS, opts);

  function log(msg, level = 'info') {
    if (options.verbose) {
      console[level](`[@semcore/babel-plugin-react-semcore] ${msg}`);
    }
  }

  function containsMagicComment(node, css_start, file_path) {
    const { leadingComments } = node;
    if (!Array.isArray(leadingComments)) return;
    if (!leadingComments.length) return;
    const { value } = leadingComments[0];
    return value.includes(css_start) || value.includes(file_path);
  }

  function getCssFilePathFromComment(node) {
    const { leadingComments } = node;
    const { value } = leadingComments[0];
    const [, filepath] = value.split(':');
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

    copyComment(node.expressions[0].arguments[0], () => {
      node.expressions[0].arguments[0] = t.StringLiteral(styles);
      return node.expressions[0].arguments[0];
    });
    node.expressions[0].arguments[1] = t.stringLiteral(hash + parse.PLACEHOLDER_REPLACER);
    node.expressions[1] = toObjectExpression(tokens);
  }

  function isValidStyles(styles) {
    if (!styles) return false;
    return (
      styles.init.type === 'SequenceExpression' &&
      containsMagicComment(
        styles.init,
        RESHADOW_MAGIC_COMMENTS.CSS_START,
        RESHADOW_MAGIC_COMMENTS.FILE_PATH,
      )
    );
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

        const getThemeCssPaths = () => {
          const filename = state.file.opts.filename;

          const packageJson = options.findPackage(filename);
          if (!packageJson) return [null, null];

          const cssPath = getBaseCssPath(node, filename);
          if (!cssPath) return [null, null];

          const themeCssPaths = getThemeCssPathsList({
            themeMeta: this.themeMeta,
            scope: options.scope,
            pkgVersion: packageJson.version,
            pkgName: packageJson.name,
            cssFileName: path.basename(cssPath),
          });

          return [cssPath, themeCssPaths];
        };

        if (containsMagicComment(node, SEMCORE_MAGIC_COMMENTS.CSS_START)) {
          const [cssPath, themeCssPaths] = getThemeCssPaths();
          if (!cssPath || !themeCssPaths) return;

          const vars = [cssPath, ...themeCssPaths].reduce(
            (acc, p) => Object.assign(acc, getColorVars(p)),
            {},
          );

          node.declarations[0].init = toObjectExpression(vars);
        }

        if (
          containsMagicComment(
            node,
            RESHADOW_MAGIC_COMMENTS.CSS_START,
            RESHADOW_MAGIC_COMMENTS.FILE_PATH,
          )
        ) {
          const styles = node.declarations[0];
          if (!isValidStyles(styles)) return;

          const [cssPath, themeCssPaths] = getThemeCssPaths();
          if (!cssPath || !themeCssPaths) return;

          const { css, tokens, hash } = parse(cssPath, themeCssPaths, options);
          replaceWithNewStyles(styles.init, css, tokens, hash);
        }
      },
    },
  };
};
module.exports.getColorVars = getColorVars;
