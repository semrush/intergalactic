const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname);

const allFiles = fs.readdirSync(projectRoot);

const ignoreFiles = [
  '__tests__',
  'src',
  'svg',
  'svg-new',
  'node_modules',
  'Stoller',
  'YoutubeAlt',
  'YoutubeRed',
  'package.json',
  'clean.js',
  '.npmignore',
  'CHANGELOG.md',
  'README.md',
  'transform-svg-legacy.config.js',
  'transform-svg.config.js',
  'tsconfig.json',
];

const removeFiles = allFiles.filter((f) => !ignoreFiles.includes(f));

removeFiles.forEach((f) => {
  fs.rmSync(__dirname + '/' + f, {
    recursive: true,
    force: true,
  });
});
