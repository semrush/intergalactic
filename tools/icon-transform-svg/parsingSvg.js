const fs = require('fs-extra');
const glob = require('glob');
const cheerio = require('cheerio');
const path = require('path');

module.exports = async function() {
  const publicPath = path.join(process.cwd(), '/svg');

  glob(`${path.resolve(__dirname)}/svg/**/*.svg`, {}, async (er, files) => {
    console.log('number svg:', files.length);
    if (!files.length) return false;

    fs.rmdir(publicPath);

    for (let file of files) {
      try {
        const data = await parsingSvg(file);
        let { filePath, nameSvg } = await createPublicPath(file, publicPath);
        writeFile(filePath, data, nameSvg);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

function parsingSvg(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      const $ = cheerio.load(data, {
        normalizeWhitespace: false,
      });

      const pathSvg = $('body')
        .find('path')
        .removeAttr('id');

      const polygonSvg = $('body')
        .find('polygon')
        .removeAttr('id');

      const svg = $('body').find('svg');

      pathSvg.length && svg.empty().prepend(pathSvg);
      polygonSvg.length && svg.empty().prepend(polygonSvg);

      const result = $('body').html();

      return resolve(result);
    });
  });
}

function createPublicPath(filePath, publicPath) {
  return new Promise((resolve) => {
    const namePathArr = filePath.split('/');
    const nameSvgArr = namePathArr.slice(-2);
    // const reg = /^(\w+)/;
    //
    // nameSvgArr[1] = nameSvgArr[1].replace(
    //   reg,
    //   nameSvgArr[1].match(reg)[0].toUpperCase()
    // );
    const nameSvg = nameSvgArr.join('/');

    resolve({ filePath: `${publicPath}/${nameSvg}`, nameSvg });
  });
}

function writeFile(filePath, data, nameSvg) {
  return new Promise((resolve, reject) => {
    fs.outputFile(filePath, data, (err) => {
      if (err) return reject(err);
      console.log(`parsing finish: ${nameSvg}`);
      return resolve(true);
    });
  });
}
