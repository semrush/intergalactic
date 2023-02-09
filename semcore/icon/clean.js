const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const unlink = util.promisify(fs.unlink);
const rm = util.promisify(fs.rm);
const rootDir = path.resolve(__dirname);

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

const removeDir = async (dir) => {
  try {
    const allFiles = await readdir(dir);
    const files = allFiles.filter((f) => !ignoreFiles.includes(f));
    await Promise.all(
      files.map(async (file) => {
        try {
          const p = path.join(dir, file);
          const stat = await lstat(p);
          if (stat.isDirectory()) {
            await removeDir(p);
          } else {
            await unlink(p);
          }
        } catch (err) {
          console.error(err);
        }
      }),
    );
    if (dir !== rootDir && dir !== path.join(rootDir, 'color')) {
      await rm(dir, {
        recursive: true,
        force: true,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

removeDir(rootDir);
