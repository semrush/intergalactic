const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const Spritesmith = require('spritesmith');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const rootDir = process.cwd();

function getPathStaticFile({ name, version, fileName }) {
  return `https://static.semrush.com/ui-kit/${name}/${version}/${fileName}`;
}

function replaceNameInCamelCase(name = '', divider) {
  const regExp = new RegExp(`${divider}([A-Za-z])`, 'g');
  return name.replace(/,/g, '').replace(regExp, (g) => g[1].toUpperCase());
}

const cssTemplate = (coordinates, version) => {
  const listCountriesWithOneFlag = require(path.resolve(
    rootDir,
    'src',
    'CountriesWithOneFlag.json',
  ));

  let css = '';
  const setCss = ({ name, version, x, y }) =>
    `.flag-${name}-${version} {
      background-position: ${x ? `-${x}px` : 0} ${y ? `-${y}px` : 0};
    }\n`;
  Object.keys(coordinates).forEach((pathIcon) => {
    // name format camelCase
    const name = replaceNameInCamelCase(
      pathIcon
        .split('/')
        .pop()
        .replace(/.png$/, '')
        .replace(/-([A-Za-z])/g, (g) => g[1].toUpperCase()),
    );

    const { x, y } = coordinates[pathIcon];
    css += setCss({ name, version, x, y });

    const countriesNames = listCountriesWithOneFlag[name.replace(/\B([A-Z])/g, ' $1')];
    if (countriesNames) {
      css += countriesNames.reduce(
        (str, nameCountry) =>
          (str += setCss({ name: replaceNameInCamelCase(nameCountry, '\\s'), version, x, y })),
        '',
      );
    }
  });

  return css;
};

const generateStaticPathSpriteFile = (sprite, version, size) => {
  return `.flag-${version} {
  background-image: url(${getPathStaticFile({
    name: 'flags',
    version: version.split('_').join('.'),
    fileName: `sprite@${size}.png`,
  })});
  background-size: ${sprite.properties.width}px ${sprite.properties.height}px;
}`;
};

const generatePngSprite = (source, size, outLib) => {
  return new Promise((resolve, reject) => {
    glob(`${rootDir}/${source}/${size}/**/*png`, (err, flags) => {
      if (err) {
        reject(err);
        throw new Error(err);
      }
      Spritesmith.run(
        {
          src: flags,
          algorithmOpts: {
            sort: false,
          },
        },
        (err, result) => {
          // If there was an error, throw it
          if (err) throw new Error(err);
          // Output the image
          fs.outputFile(path.join(rootDir, `${outLib}/sprite@${size}.png`), result.image);
          resolve(result);
        },
      );
    });
  });
};

const generateCssSprite = (result, size, outLib, version) => {
  return new Promise((resolve, reject) => {
    const css =
      cssTemplate(result.coordinates, version) +
      generateStaticPathSpriteFile(result, version, size);

    // Output the css
    fs.outputFile(path.join(rootDir, `${outLib}/sprite@${size}.css`), css, (err) => {
      if (err) reject(err);
      resolve();
      console.log(`✅ done ${outLib}/sprite@${size}.css`);
    });
  });
};

module.exports = async function (version) {
  version = version.split('.').join('_');

  let result1x = await generatePngSprite('png', '1x', 'lib/sprites');
  await generateCssSprite(result1x, '1x', 'lib/sprites', version);
  const result2x = await generatePngSprite('png', '2x', 'lib/sprites');
  result1x.image = result2x.image;
  await generateCssSprite(result1x, '2x', 'lib/sprites', version);
  await imagemin([`${rootDir}/lib/sprites/*.png`], {
    destination: `${rootDir}/lib/sprites`,
    plugins: [imageminPngquant()],
  });
};
