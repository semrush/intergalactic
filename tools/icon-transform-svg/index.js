const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const cheerio = require('cheerio');
const { configFile } = require('mri')(process.argv.slice(2));
const util = require('util');
const config = require('./config');
const babel = require('@babel/core');

const outputFile = util.promisify(fs.outputFile);
const readFile = util.promisify(fs.readFile);

const rootDir = process.cwd();
let customConfig = () => {};

if (configFile) {
  customConfig = require(path.resolve(rootDir, configFile));
}

const {
  template,
  templateDTS = template,
  transformer,
  babelConfig: defaultBabelConfig,
  tasks,
} = { ...config(), ...customConfig() };
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

async function svgToReactComponent(iconPath, name, group) {
  try {
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

    const source = template({
      ...$svg[0].attribs,
      sourcePath: iconSvg.replace(/<(\/)?svg>(\n)?/g, ''),
      dataName: name,
      dataGroup: group.toLowerCase(),
      name,
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
        const cjs = await babel.transformAsync(source, babelConfig);
        const esm = await babel.transformAsync(source, { presets: ['@babel/preset-react'] });

        outputFile(path.join(rootDir, location), cjs.code);
        outputFile(path.join(rootDir, location.replace('.js', '.mjs')), esm.code);
        outputFile(path.join(rootDir, location.replace('.js', '.d.ts')), templateDTS(name));
        return { name, location, group };
      });

      const data = await Promise.all(results);
      resolve(data);
    });
  });
};

function getDescriptionPayIcons(iconPath, outLib) {
  const name = path.basename(iconPath, '.svg').replace(/('|\s)/g, '');
  const location = `${outLib}/${name}/index.js`;

  return {
    name,
    location,
    group: '',
  };
}

module.exports = function () {
  Promise.all(
    tasks({
      generateIcons,
      getDescriptionIcons,
      getDescriptionExternalIcons,
      getDescriptionPayIcons,
    }),
  )
    .then(() => {
      console.log('Done! Wrote all icon files.');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
