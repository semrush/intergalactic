const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const cheerio = require('cheerio');
const {
  lib = 'react',
  sourceFolder = 'svg',
  outputFolder = '.',
  ...otherArgs
} = require('mri')(process.argv.slice(2));
const util = require('util');
const config = require('./config');
const babel = require('@babel/core');

const outputFile = util.promisify(fs.outputFile);
const readFile = util.promisify(fs.readFile);

const rootDir = process.cwd();
const { template, templateDTS = template, transformer } = config(lib, otherArgs);
const converter = transformer();

const BABEL_ENV_EXTENSIONS_MAP = {
  commonjs: '.js',
  es6: '.mjs',
};

function getDescriptionExternalIcons(iconPath, outLib) {
  const name = path.basename(iconPath, '.svg');
  const group = iconPath.replace(rootDir, '').split('/')[3];
  const location = `${outLib}/${group}${name}/index.js`;
  return {
    name: `${group}${name}`,
    location,
    group,
  };
}

function getDescriptionIcons(iconPath, outLib) {
  const fileName = path.basename(iconPath, '.svg');
  const groupsReg = /(xxs|xs|s|m|l|xl|xxl)$/;
  const match = fileName.match(groupsReg);
  if (!match) throw new Error(`"${fileName}" has invalid size`);
  const size = match[1];
  const name = iconPath.replace(rootDir, '').split('/')[3];
  const location = `${outLib}/${name}/${size}/index.js`;

  return {
    name,
    location,
    group: size,
  };
}

async function svgToReactComponent(iconPath, name, group) {
  const svg = await readFile(iconPath, 'utf-8');

  const $ = cheerio.load(svg, { xmlMode: true });
  const $svg = $('svg');
  if ($svg.attr('viewBox') === undefined) {
    throw new Error(`Icon "${iconPath}" hasn't viewBox attribute`);
  }
  $svg.find('path').attr('shape-rendering', 'geometricPrecision');
  const iconSvg = converter
    ? converter.convert(`<svg>${$svg.html()}</svg>`)
    : `<svg>${$svg.html()}</svg>`;
  const viewBox = $svg.attr('viewBox');
  const width = $svg.attr('width');
  const height = $svg.attr('height');

  const source = template({
    NAME: name,
    SOURCE_PATH: iconSvg.replace(/<(\/)?svg>(\n)?/g, ''),
    VIEW_BOX: viewBox,
    WIDTH: width,
    HEIGHT: height,
    DATA_NAME: name,
    DATA_GROUP: group.toLowerCase(),
  });

  return source;
}

const generateIcons = (sourceLib, outLib, getDescriptionIcons, babelEnv) => {
  return new Promise((resolve, reject) => {
    glob(`${rootDir}/${sourceLib}/**/*svg`, async (err, icons) => {
      if (err) reject(error);
      const results = icons.map(async (iconPath) => {
        const { name, location, group } = getDescriptionIcons(iconPath, outLib);
        const source = await svgToReactComponent(iconPath, name, group);
        const { code } = await babel.transformAsync(source, {
          filename: iconPath,
          envName: babelEnv,
          presets: ['@semcore/babel-preset-ui'],
        });
        const outPathParse = path.parse(path.join(rootDir, location));
        outputFile(
          path.format({ ...outPathParse, base: '', ext: BABEL_ENV_EXTENSIONS_MAP[babelEnv] }),
          code,
        );
        // create d.ts files
        outputFile(path.format({ ...outPathParse, base: '', ext: '.d.ts' }), templateDTS(name));
        return { name, location, group };
      });

      const data = await Promise.all(results);
      resolve(data);
    });
  });
};

function getDescriptionPayIcons(iconPath, outLib) {
  if (sourceFolder === 'svg-new') return getDescriptionIcons(iconPath, outLib);
  const name = path.basename(iconPath, '.svg').replace(/('|\s)/g, '');
  const location = `${outLib}/${name}/index.js`;

  return {
    name,
    location,
    group: '',
  };
}

module.exports = function () {
  const icons = ['commonjs', 'es6'].reduce(
    (icons, babelEnv) =>
      icons.concat([
        generateIcons(
          `${sourceFolder}/color`,
          `${outputFolder}/color`,
          getDescriptionIcons,
          babelEnv,
        ),
        generateIcons(
          `${sourceFolder}/external`,
          `${outputFolder}/external`,
          getDescriptionExternalIcons,
          babelEnv,
        ),
        generateIcons(
          `${sourceFolder}/pay`,
          `${outputFolder}/pay`,
          getDescriptionPayIcons,
          babelEnv,
        ),
        generateIcons(`${sourceFolder}/icon`, outputFolder, getDescriptionIcons, babelEnv),
      ]),
    [],
  );
  Promise.all(icons)
    .then(() => {
      console.log('Done! Wrote all icon files.');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
