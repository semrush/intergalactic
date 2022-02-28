import { packages } from '../components.json';
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

function sortObjKeys(obj) {
  return Object.keys(obj).sort();
}

const releaseDirs = fs
  .readdirSync(path.resolve(__dirname, '..'))
  .filter((entry) => fs.statSync(path.resolve(__dirname, '..', entry)).isDirectory());
const generated = releaseDirs.length > 2;

describe('@semcore/ui', () => {
  if (!generated) {
    test.skip('release was not generated', () => {});
    return;
  }
  const EXCLUDE_PACKAGE = ['@semcore/utils', '@semcore/email', '@semcore/chart'];
  packages.forEach((pkg) => {
    if (EXCLUDE_PACKAGE.includes(pkg)) return;

    test(`Package "${pkg}" provides correct exports to release system`, () => {
      const rscUiPkgPath = path.resolve(__dirname, pkg.replace('@semcore', '..'));

      const source = require(require
        .resolve(pkg)
        .replace('/src/', '/lib/cjs/')
        .replace(/\.ts[x]{0,1}$/, '.js'));
      const rscUi = require(rscUiPkgPath);

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});

describe('Utils', () => {
  if (!generated) {
    test.skip('release was not generated', () => {});
    return;
  }
  const utils = require.resolve('disable-jest-mapper:@semcore/utils/lib');
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
      const source = require(`disable-jest-mapper:@semcore/utils/lib/${utilsModule}`);
      const rscUi = require('disable-jest-mapper:' +
        path.resolve(__dirname, `../utils/lib/${utilsModule}`));

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});

describe('Icon', () => {
  if (!generated) {
    test.skip('release was not generated', () => {});
    return;
  }
  const icons = require.resolve('disable-jest-mapper:@semcore/icon');
  const iconsDir = path.resolve(icons, '../..');
  const rscIconsDir = path.resolve(__dirname, '../icon/lib');

  const isCopiedFile = (absolutePath) =>
    ['/__tests__/', '/src/', '/svg/', '/svg-new/', 'es6', 'cjs', 'types', '/node_modules/'].every(
      (ignorePath) =>
        !path.relative(path.resolve(__dirname, '../../..'), absolutePath).includes(ignorePath),
    );

  const pkgFiles = glob.sync(`${iconsDir}/**/*.js`).filter(isCopiedFile);

  const rscFiles = glob.sync(`${rscIconsDir}/**/*.js`).filter(isCopiedFile);

  test(`package provides whole filesystem to release system`, () => {
    const pathFormatter = (path) => path.split('/icon/')[1];
    const formattedPkgFiles = pkgFiles.map(pathFormatter);
    const formattedRscFiles = rscFiles.map(pathFormatter);
    expect(formattedPkgFiles).toStrictEqual(formattedRscFiles);
  });

  pkgFiles.forEach((filePath) => {
    const utilsModule = filePath.split('/icon/')[1];

    test(`file ${utilsModule} provides correct exports to release system`, () => {
      const source = require(`disable-jest-mapper:@semcore/icon/${utilsModule}`);
      const rscUi = require(path.resolve(__dirname, `../icon/${utilsModule}`));

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});
