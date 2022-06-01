const fs = require('fs-extra');
const glob = require('glob');
const cheerio = require('cheerio');
const path = require('path');

module.exports = async function (publicPath, svgSrcGlobPath) {
  return new Promise(async (resolve, reject) => {
    publicPath = publicPath || path.join(process.cwd(), '/svg');
    svgSrcGlobPath = svgSrcGlobPath || `${path.resolve(__dirname)}/svg/**/*.svg`;

    try {
      const files = glob.sync(svgSrcGlobPath);
      console.log('number svg:', files.length);
      if (!files.length) return false;
      fs.rmdir(publicPath);

      await Promise.all(
        files.map(async (file) => {
          try {
            const data = await parsingSvg(file);
            const { filePath, nameSvg } = await createPublicPath(file, publicPath);
            await writeFile(filePath, data, nameSvg);
          } catch (error) {
            console.error(error);
            reject(error);
          }
        }),
      );
      console.log('Done! Parsing all svg files.');
      resolve(true);
    } catch (error) {
      console.error(error);
      reject(error);
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

      const pathSvg = $('body').find('path').removeAttr('id');

      const polygonSvg = $('body').find('polygon').removeAttr('id');

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
    const nameSvg = filePath.split('/').slice(-3).join('/');

    resolve({ filePath: `${publicPath}/${nameSvg}`, nameSvg });
  });
}

function writeFile(filePath, data, nameSvg) {
  return new Promise((resolve, reject) => {
    fs.outputFile(filePath, data, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
}
