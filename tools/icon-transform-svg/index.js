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
const packageJson = require(path.resolve(rootDir, 'package.json'));
process.chdir(__dirname);
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
    type: null,
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
    type: outLib.split('/')[1],
  };
}

function makeId(idLetter, name, group) {
  const version = packageJson.version;

  return `intergalactic-icon-${name}_${group}_${idLetter}-${version}`;
}

function patchSvg($svg, fromElement, toElement, name, group) {
  let shouldPatchId = false;

  $svg.find(fromElement).each(function () {
    const fillData = this.attribs.fill;

    if (fillData) {
      const match = fillData.match(/^url\(#([a-z0-9])+\)$/);

      if (match && match.length > 1 && match[1]) {
        const idLetter = match[1];

        this.attribs.fill = `url(#${makeId(idLetter, name, group)})`;

        shouldPatchId = true;
      }
    }
  });

  if (shouldPatchId) {
    $svg.find(toElement).each(function () {
      const idLetter = this.attribs.id;

      this.attribs.id = makeId(idLetter, name, group);
    });
  }
}

function patchLinearGradient($svg, name, group) {
  patchSvg($svg, 'path', 'linearGradient', name, group);
}

function patchClipPath($svg, name, group) {
  patchSvg($svg, 'g', 'clipPath', name, group);
}

async function svgToReactComponent({ iconPath, name, group, type, buildType }) {
  try {
    const svg = await readFile(iconPath, 'utf-8');

    const $ = cheerio.load(svg, { xmlMode: true });
    const $svg = $('svg');
    if ($svg.attr('viewBox') === undefined) {
      throw new Error(`Icon "${iconPath}" hasn't viewBox attribute`);
    }

    patchLinearGradient($svg, name, group);
    patchClipPath($svg, name, group);

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
      type,
      buildType,
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
      if (err) reject(err);
      const results = icons.map(async (iconPath) => {
        const { name, location, type, group } = getDescriptionIcons(iconPath, outLib);
        const sourceCjs = await svgToReactComponent({ iconPath, name, type, buildType: 'cjs', group });
        const sourceEsm = await svgToReactComponent({ iconPath, name, type, buildType: 'esm', group });
        const cjs = await babel.transformAsync(sourceCjs, babelConfig);
        const esm = await babel.transformAsync(sourceEsm, { presets: ['@babel/preset-react'] });

        outputFile(path.join(rootDir, location), cjs.code);
        outputFile(path.join(rootDir, location.replace('.js', '.mjs')), esm.code);
        outputFile(path.join(rootDir, location.replace('.js', '.d.ts')), templateDTS(name));
        outputFile(path.join(rootDir, location.replace('.js', '.mjs.d.ts')), templateDTS(name));
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
    type: 'pay',
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
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log('Done! Wrote all icon files.');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
