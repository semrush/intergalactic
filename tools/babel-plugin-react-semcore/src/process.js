const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const stringHash = require('string-hash');
const replaceAll = require('string.prototype.replaceall');
const { postcss } = require('@semcore/babel-plugin-styles');
const finderPackageJson = require('find-package-json');

const projectRoot = path.resolve(__dirname, '../../..');

function Cache() {
  const PARSED_STYLES_MAP = new Map();
  return {
    get: (path, content) => {
      const cachedData = PARSED_STYLES_MAP.get(path);
      if (!cachedData) return;
      const currentHash = stringHash(content);
      const { hash, data } = cachedData;
      return currentHash === hash ? data : undefined;
    },
    set: (path, content, data) => {
      PARSED_STYLES_MAP.set(path, {
        hash: stringHash(content),
        data,
      });
    },
  };
}

function createImports(paths) {
  return paths.map((path) => `@import '${path}';`).join('\n');
}

function execPurgeCss(styles, purgeCSSOptions) {
  const stringBUF = Buffer.from(styles, 'utf8');
  const options = JSON.stringify(purgeCSSOptions);

  const stdout = execFileSync(
    'node',
    [path.resolve(__dirname, 'purgeCss.js'), stringBUF, options],
    {
      encoding: 'utf-8',
    },
  );

  try {
    const { css, err } = JSON.parse(stdout);
    if (err) throw new Error(err);
    if (css) return css;
  } catch (e) {
    throw new Error(e.message);
  }
}

const storage = new Cache();

module.exports = function (baseImport, themeImports, pluginOptions) {
  pluginOptions.postcss.shadow = Object.assign(
    {},
    {
      generateHash: function (css, filename) {
        const packageJson = finderPackageJson(filename).next();
        const relativeFilename = path.relative(packageJson.filename, filename);
        // replace for tests
        return stringHash(replaceAll(css, projectRoot, '<rootDir>') + relativeFilename)
          .toString(36)
          .substring(0, 5);
      },
    },
    pluginOptions.postcss.shadow,
  );
  const processor = postcss(pluginOptions.postcss);

  const themeCss = themeImports.map((p) => fs.readFileSync(p, 'utf8')).join('');
  // try to return from cache
  const fromCache = storage.get(baseImport, themeCss);
  if (fromCache) {
    return fromCache;
  }

  // inserting base css import on top of theme
  const raw = createImports([baseImport, ...themeImports]);
  const { css, messages } = processor.process(raw, { from: baseImport });
  const { tokens, hash } = messages.find((m) => m.plugin === 'postcss-shadow-styles');
  const purgedStyles = execPurgeCss(css, pluginOptions.purgeCSS);
  const data = {
    css: purgedStyles,
    tokens,
    hash,
  };

  storage.set(baseImport, themeCss, data);
  return data;
};
module.exports.PLACEHOLDER_REPLACER = postcss.PLACEHOLDER_REPLACER;
module.exports.execPurgeCss = execPurgeCss;
