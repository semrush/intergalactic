import path from 'node:path';
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';
import { log } from '../utils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..', '..', '..', 'entry-point');

async function copyComponent(componentName: string, toCopy: string | string[]) {
  await fs.mkdir(path.resolve(dirname, componentName), { recursive: true });

  const dirsToCopy = Array.isArray(toCopy) ? toCopy : [toCopy];

  await Promise.all(
    dirsToCopy.map(async (item) => {
      const from = path.resolve(dirname, '..', '..', 'semcore', componentName, item);
      const to = path.resolve(dirname, componentName, item);

      await fs.copy(from, to, { recursive: true });
    }),
  );
  const { replaceImports } = await import('intergalactic-migrate');

  await replaceImports(path.resolve(dirname, componentName));
}

async function makeIndexType(componentName: string) {
  const from = path.resolve(dirname, componentName, 'lib', 'types');
  const to = path.resolve(dirname, componentName);

  await fs.copy(from, to, { recursive: true });
}
async function makeIndexCJS(componentName: string) {
  const dataToWrite = `"use strict";

module.exports.__esModule = true;
var item = require("./lib/cjs/index");
module.exports = item['default'] || {};
Object.keys(item).forEach(function (key) {
  module.exports[key] = item[key];
});
`;
  const pathToFile = path.resolve(dirname, componentName, 'index.js');

  await fs.writeFile(pathToFile, dataToWrite, 'utf8');
}
async function makeIndexESM(componentName: string) {
  const pathToFile = path.resolve(dirname, componentName, 'index.mjs');

  let dataToWrite = `export * from './lib/es6/index.js';`;

  const indexData = await fs.readFile(
    path.resolve(dirname, componentName, 'lib', 'es6', 'index.js'),
    'utf8',
  );

  if (/export { default(,|\s})/.test(indexData) || indexData.includes('export default')) {
    dataToWrite = dataToWrite + `\nexport { default } from './lib/es6/index.js';`;
  }

  await fs.writeFile(pathToFile, dataToWrite, 'utf8');
}

async function makePackageJson(componentName: string) {
  const packageJSON = await fs.readJSON(
    path.resolve(dirname, '..', '..', 'semcore', componentName, 'package.json'),
  );
  const pathToWrite = path.resolve(dirname, componentName, 'package.json');

  packageJSON.name = packageJSON.name.replace('@semcore', 'intergalactic');

  await fs.writeJSON(pathToWrite, packageJSON, 'utf8');
}

async function copyIcon(name: string) {
  const iconsPath = path.resolve(dirname, '..', '..', 'semcore', name);

  const isIconDir = (dir: string) => {
    const pathToIconDir = path.resolve(iconsPath, dir);

    return (
      fs.statSync(pathToIconDir).isDirectory() &&
      !['__tests__', 'src', 'svg', 'node_modules'].includes(path.basename(dir))
    );
  };

  const iconsDirs = await fs.readdir(iconsPath);
  const icons = iconsDirs.filter(isIconDir);

  await copyComponent(name, icons);
}

export async function copyLib(packages: string[]) {
  log('Copy libs...');

  for (const dep of packages) {
    const [scope, name] = dep.split('/');

    if (scope !== '@semcore') {
      throw new Error(`Only @semcore score is available for now. You try to pass [${scope}]`);
    }

    switch (name) {
      case 'utils': {
        await copyComponent(name, ['lib', 'style']);
        break;
      }
      case 'icon': {
        await copyIcon(name);
        await makePackageJson(name);
        await makeIndexType(name);
        await makeIndexCJS(name);
        await makeIndexESM(name);
        break;
      }
      case 'illustration': {
        await copyIcon(name);
        await makePackageJson(name);
        await makeIndexType(name);
        await makeIndexCJS(name);
        await makeIndexESM(name);
        break;
      }
      case 'email': {
        // We don't need to copy email for now
        break;
      }
      default: {
        await copyComponent(name, 'lib');
        await makePackageJson(name);
        await makeIndexType(name);
        await makeIndexCJS(name);
        await makeIndexESM(name);
      }
    }
  }
}
