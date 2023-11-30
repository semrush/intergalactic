import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { log } from './logger';
import { replaceImports } from './importUtils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

async function copyComponent(componentName: string, toCopy: string | string[]) {
  await fs.mkdir(path.resolve(dirname, 'libs', componentName), { recursive: true });

  const dirsToCopy = Array.isArray(toCopy) ? toCopy : [toCopy];

  await Promise.all(
    dirsToCopy.map(async (item) => {
      const from = path.resolve(dirname, '..', '..', 'semcore', componentName, item);
      const to = path.resolve(dirname, 'libs', componentName, item);

      await fs.copy(from, to, { recursive: true });
    }),
  );

  await replaceImports(path.resolve(dirname, 'libs', componentName));
}

async function makeIndexType(componentName: string) {
  const from = path.resolve(dirname, 'libs', componentName, 'lib', 'types', 'index.d.ts');
  const to = path.resolve(dirname, 'libs', componentName, 'index.d.ts');

  await fs.copy(from, to);
}
async function makeIndexCJS(componentName: string) {
  const dataToWrite = `require('./cjs/index.js');`;
  const pathToFile = path.resolve(dirname, 'libs', componentName, 'index.js');

  await fs.writeFile(pathToFile, dataToWrite, 'utf8');
}
async function makeIndexESM(componentName: string) {
  const dataToWrite = `export * from './es6/index.js';`;
  const pathToFile = path.resolve(dirname, 'libs', componentName, 'index.mjs');

  await fs.writeFile(pathToFile, dataToWrite, 'utf8');
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
        await makeIndexType(name);
        await makeIndexCJS(name);
        await makeIndexESM(name);
        break;
      }
      case 'illustration': {
        await copyIcon(name);
        await makeIndexType(name);
        await makeIndexCJS(name);
        await makeIndexESM(name);
        break;
      }
      case 'email': {
        await copyComponent(name, 'lib');
        // We don't need to make Types file, because email has only styles
        await makeIndexCJS(name);
        await makeIndexESM(name);
        break;
      }
      default: {
        await copyComponent(name, 'lib');
        await makeIndexType(name);
        await makeIndexCJS(name);
        await makeIndexESM(name);
      }
    }
  }
}
