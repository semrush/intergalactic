const fs = require('fs-extra');
const glob = require('glob');
const cheerio = require('cheerio');
const path = require('path');

module.exports = async function (publicPath, svgSrcGlobPath) {
  publicPath = publicPath || path.join(process.cwd(), '/svg');
  svgSrcGlobPath = svgSrcGlobPath || `${path.resolve(__dirname)}/svg/**/*.svg`;

  const files = glob.sync(svgSrcGlobPath);
  if (!files.length) return false;
  fs.rmdir(publicPath);

  await Promise.all(
    files.map(async (file) => {
      const data = await parsingSvg(file);
      const { filePath } = await createPublicPath(file, publicPath);
      await fs.outputFile(filePath, data);
    }),
  );
};

const parsingSvg = async (filePath) => {
  const fileData = await fs.readFile(filePath, 'utf8');

  const $ = cheerio.load(fileData, {
    normalizeWhitespace: false,
  });

  const $body = $('body');

  const pathSvg = $body.find('path').removeAttr('id');

  const polygonSvg = $body.find('polygon').removeAttr('id');

  const svg = $body.find('svg');

  pathSvg.length && svg.empty().prepend(pathSvg);
  polygonSvg.length && svg.empty().prepend(polygonSvg);

  return $body.html();
};

const createPublicPath = (filePath, publicPath) => {
  const nameSvg = filePath.split('/').slice(-3).join('/');

  return { filePath: `${publicPath}/${nameSvg}`, nameSvg };
};
