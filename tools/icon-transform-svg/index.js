const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const cheerio = require('cheerio');
const { lib, outputFolder = '.' } = require('minimist')(process.argv.slice(2));
const util = require('util');
const config = require('./config');
const babel = require('@babel/core');

const outputFile = util.promisify(fs.outputFile);
const readFile = util.promisify(fs.readFile);

const rootDir = process.cwd();
const { template, templateDTS = template, transformer, babelConfig: defaultBabelConfig } = lib
  ? config(lib, outputFolder === 'lib')
  : config('react', outputFolder === 'lib');
const converter = transformer();

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

function getDescriptionPayIcons(iconPath, outLib) {
  const name = path.basename(iconPath, '.svg').replace(/('|\s)/g, '');
  const location = `${outLib}/${name}/index.js`;

  return {
    name,
    location,
    group: '',
  };
}

async function svgToReactComponent(iconPath, name, group) {
  try {
    const svg = await readFile(iconPath, 'utf-8');

    const $ = cheerio.load(svg, { xmlMode: true });
    const $svg = $('svg');
    if ($svg.attr('viewBox') === undefined) {
      reject(`Icon "${iconPath}" hasn't viewBox attribute`);
    }
    $svg
      .find('path')
      .removeAttr('fill-rule')
      .attr('shape-rendering', 'geometricPrecision');
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
  } catch (err) {
    throw new Error(err);
  }
}

const generateIcons = (
  sourceLib,
  outLib,
  getDescriptionIcons,
  babelConfig = defaultBabelConfig,
) => {
  return new Promise((resolve, reject) => {
    glob(`${rootDir}/${sourceLib}/**/*svg`, async (err, icons) => {
      if (err) reject(error);
      const results = icons.map(async (iconPath) => {
        const { name, location, group } = getDescriptionIcons(iconPath, outLib);
        const source = await svgToReactComponent(iconPath, name, group);
        const { code } = await babel.transformAsync(source, babelConfig);

        outputFile(path.join(rootDir, location), code);
        // create d.ts files
        outputFile(path.join(rootDir, location.replace('.js', '.d.ts')), templateDTS(name));
        return { name, location, group };
      });

      const data = await Promise.all(results);
      resolve(data);
    });
  });
};

module.exports = function() {
  Promise.all([
    generateIcons('svg/color', `${outputFolder}/color`, getDescriptionIcons),
    generateIcons('svg/external/', `${outputFolder}/external`, getDescriptionExternalIcons),
    generateIcons('/svg/pay/', `${outputFolder}/pay`, getDescriptionPayIcons),
    generateIcons('svg/icon', outputFolder, getDescriptionIcons),
  ])
    .then(() => {
      console.log('Done! I writed all files icons');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
