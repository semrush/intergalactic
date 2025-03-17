import { packages } from '../components.json';
import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { expect, test, describe } from '@semcore/testing-utils/vitest';

function sortObjKeys(obj) {
  return Object.keys(obj).sort();
}

const releaseDirs = fs
  .readdirSync(path.resolve(__dirname, '..'))
  .filter((entry) => fs.statSync(path.resolve(__dirname, '..', entry)).isDirectory());
const generated = releaseDirs.length > 2;

const componentsPath = path.resolve(__dirname, '../components.json');
const packageJsonPath = path.resolve(__dirname, '../package.json');
const components = JSON.parse(fs.readFileSync(componentsPath, 'utf8'));
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const semcorePackages = fs
  .readdirSync(path.resolve(__dirname, '../../'))
  .filter((pkg) => !['ui', 'table', 'stylelint-plugin'].includes(pkg))
  .map((pkg) => `@semcore/${pkg}`);

const dependencyPackages = Object.keys(packageJson.dependencies || {}).filter((pkg) =>
  pkg.startsWith('@semcore/'),
);

const expectedPackages = new Set(components.packages);
const installedPackages = new Set(semcorePackages);
const declaredPackages = new Set(dependencyPackages);

function compareSets(setA, setB) {
  return setA.size === setB.size && [...setA].every((x) => setB.has(x));
}

if (
  !compareSets(installedPackages, expectedPackages) ||
  !compareSets(declaredPackages, expectedPackages)
) {
  components.packages = Array.from(new Set([...semcorePackages, ...dependencyPackages])).sort();
  fs.writeFileSync(componentsPath, JSON.stringify(components, null, 2), 'utf8');
}

describe('Packages Validation', () => {
  test('All expected packages are present in components.json', () => {
    expect(installedPackages).toEqual(expectedPackages);
  });

  test('All expected packages are in package.json dependencies', () => {
    expect(declaredPackages).toEqual(expectedPackages);
  });
});

describe('@semcore/ui', () => {
  if (!generated) {
    test('release was not generated', () => {});
    return;
  }
  const EXCLUDE_PACKAGE = [
    '@semcore/utils',
    // '@semcore/illustration',
    '@semcore/email',
  ];
  packages.forEach((pkg) => {
    if (EXCLUDE_PACKAGE.includes(pkg)) return;

    test(`Package "${pkg}" provides correct exports to release system`, () => {
      const rscUiPkgPath = path.resolve(__dirname, pkg.replace('@semcore', '..'));

      const sourcePath = require
        .resolve(pkg)
        .replace('/src/', '/lib/cjs/')
        .replace(/\.ts[x]{0,1}$/, '.js');
      const source = require(sourcePath);
      const rscUi = require(rscUiPkgPath);

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});

describe('Utils', () => {
  if (!generated) {
    test('release was not generated', () => {});
    return;
  }
  const utils = require.resolve('@semcore/utils/lib');
  const utilsDir = path.dirname(utils);
  const rscUtilsDir = path.resolve(__dirname, '../utils/src');

  const pkgFiles = glob.sync(`${utilsDir}/**/*.js`);
  const rscFiles = glob.sync(`${rscUtilsDir}/**/*.js`);

  test('package provides whole filesystem to release system', () => {
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
      const rscUi = require(`disable-jest-mapper:${path.resolve(
        __dirname,
        `../utils/lib/${utilsModule}`,
      )}`);

      expect(sortObjKeys(source)).toStrictEqual(sortObjKeys(rscUi));
    });
  });
});

describe('Icon', () => {
  // if (!generated) {
  //   test.skip('release was not generated', () => {});
  //   return;
  // }
  const icons = require.resolve('@semcore/icon');
  const iconsDir = path.resolve(icons, '../..');
  const rscIconsDir = path.resolve(__dirname, '../icon/lib');

  const isCopiedFile = (absolutePath) =>
    ['/__tests__/', '/src/', '/svg/', '/svg-new/', 'es6', 'cjs', 'types'].every(
      (ignorePath) =>
        !path.relative(path.resolve(__dirname, '../../..'), absolutePath).includes(ignorePath),
    );

  const pkgFiles = glob.sync(`${iconsDir}/**/*.js`).filter(isCopiedFile);

  const rscFiles = glob.sync(`${rscIconsDir}/**/*.js`).filter(isCopiedFile);

  test('package provides whole filesystem to release system', () => {
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
