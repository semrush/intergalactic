const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const stringHash = require('string-hash');
const postcss = require('@semcore/babel-plugin-shadow/postcss');
const { defaultOptions } = require('@semcore/babel-plugin-shadow');

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

function execPurgeCss(styles, purgeCSSOptions = {}) {
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

module.exports = function(cssPaths, pluginOptions) {
  const { media, purgeCSS } = pluginOptions;
  const parser = postcss(defaultOptions.postcss);
  const [baseImport, ...themeImport] = cssPaths;

  const themeCss = themeImport.map((p) => fs.readFileSync(p, 'utf8')).join('');
  // try to return from cache
  const fromCache = storage.get(baseImport, themeCss);
  if (fromCache) {
    return fromCache;
  }

  // inserting base css import on top of theme
  const css = createImports(cssPaths);
  const { code, media: mediaCode, tokens } = parser.process(css, { from: baseImport });
  const purgedStyles = execPurgeCss(media ? code + mediaCode : code, purgeCSS);
  const data = {
    css: purgedStyles,
    tokens,
  };

  storage.set(baseImport, themeCss, data);
  return data;
};
