const path = require('path');
const parsingSvg = require('../parsingSvg');

(async () => {
  const rootPath = process.cwd();
  await parsingSvg(`${rootPath}/svg`, `${rootPath}/src/**/*.svg`);
})();
