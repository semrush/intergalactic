import { packages } from '../components.json';
import path from 'path';
import glob from 'glob';

function sortObjKeys(obj) {
  return Object.keys(obj).sort();
}

describe('Release system', () => {
  packages.forEach((pkg) => {
    // index.js of utils throws an error, so we skip this package
    if (pkg === '@semcore/utils') return;

    test(`Package "${pkg}" provides correct exports to release system`, () => {
      const rscUiPkgPath = pkg.replace('@semcore', '..');

      const source = require(pkg);
      const rscUi = require(rscUiPkgPath);

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});

describe('Utils', () => {
  const utils = require.resolve('@semcore/utils/lib');
  const utilsDir = path.dirname(utils);
  const rscUtilsDir = path.resolve(__dirname, '../utils/lib');

  const pkgFiles = glob.sync(`${utilsDir}/**/*.js`);
  const rscFiles = glob.sync(`${rscUtilsDir}/**/*.js`);

  test(`package provides whole filesystem to release system`, () => {
    const pathFormatter = (path) => path.split('/utils/')[1];
    const formattedPkgFiles = pkgFiles.map(pathFormatter);
    const formattedRscFiles = rscFiles.map(pathFormatter);

    expect(formattedPkgFiles).toStrictEqual(formattedRscFiles);
  });

  pkgFiles.forEach((filePath) => {
    const utilsModule = filePath.split('/utils/lib/')[1];

    // index.js of utils throws an error, so we skip this file
    if (utilsModule === 'index.js') return;

    test(`file ${utilsModule} provides correct exports to release system`, () => {
      const source = require(`@semcore/utils/lib/${utilsModule}`);
      const rscUi = require(`../utils/lib/${utilsModule}`);

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});

describe('Icon', () => {
  const icons = require.resolve('@semcore/icon');
  const iconsDir = path.resolve(icons, '../..');
  const rscIconsDir = path.resolve(__dirname, '../icon/lib');

  const pkgFiles = glob.sync(`${iconsDir}/!(cjs|es6|types)/**/*.js`);
  const rscFiles = glob.sync(`${rscIconsDir}/**/*.js`);

  test(`package provides whole filesystem to release system`, () => {
    const pathFormatter = (path) => path.split('/icon/')[1];
    const formattedPkgFiles = pkgFiles.map(pathFormatter);
    const formattedRscFiles = rscFiles.map(pathFormatter);
    expect(formattedPkgFiles).toStrictEqual(formattedRscFiles);
  });

  pkgFiles.forEach((filePath) => {
    const utilsModule = filePath.split('/icon/lib/')[1];

    test(`file ${utilsModule} provides correct exports to release system`, () => {
      const source = require(`@semcore/icon/lib/${utilsModule}`);
      const rscUi = require(`../icon/lib/${utilsModule}`);

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});
