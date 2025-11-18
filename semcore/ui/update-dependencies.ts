import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

import { Package } from '@semcore/continuous-delivery';
import glob from 'fast-glob';
import fs from 'fs-extra';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const packageFile = await fs.readJSON(path.resolve(dirname, './package.json'));

const installComponents = async () => {
  const packages = new Package();
  await packages.collectPackages();

  packageFile.dependencies = {};
  for (const pack of packages.list) {
    packageFile.dependencies[pack.name] = pack.version;
  }
  await fs.writeJSON(path.resolve(dirname, './package.json'), packageFile, { spaces: 2 });
  execSync('pnpm install --frozen-lockfile false', {
    stdio: 'inherit',
    cwd: dirname,
  });

  const nestedNodeModules = glob
    .sync('**/node_modules/**/package.json', {
      cwd: path.resolve(dirname, 'node_modules/@semcore'),
      followSymbolicLinks: false,
    })
    .map(
      (packageFilePath) =>
        `./node_modules/@semcore/${packageFilePath.substring(
          0,
          packageFilePath.length - '/package.json'.length,
        )}`,
    )
    .map((relativePath) => {
      const { version } = fs.readJsonSync(path.resolve(dirname, relativePath, 'package.json'));

      return `${relativePath} @${version}`;
    });

  if (nestedNodeModules.length > 0) {
    throw new Error(`Nested node_modules found:\n- ${nestedNodeModules.join('\n- ')}\n`);
  }
};

await installComponents();
