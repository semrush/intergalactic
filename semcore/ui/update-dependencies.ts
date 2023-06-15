import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { fetchFromNpm } from '@semcore/continuous-delivery';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const components = fs.readJSONSync(path.resolve(dirname, './components.json'));

const installComponents = async (packages: string[]) => {
  const npmPackages = await fetchFromNpm(packages);
  const packageFile = await fs.readJSON(path.resolve(dirname, './package.json'));
  packageFile.dependencies = {};
  for (const packageName of packages) {
    packageFile.dependencies[packageName] = npmPackages[packageName].version;
  }
  await fs.writeJSON(path.resolve(dirname, './package.json'), packageFile, { spaces: 2 });
  execSync(`pnpm install --frozen-lockfile --ignore-scripts false`, {
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
        './node_modules/@semcore/' +
        packageFilePath.substring(0, packageFilePath.length - '/package.json'.length),
    )
    .map((relativePath) => {
      const { version } = fs.readJsonSync(path.resolve(dirname, relativePath, 'package.json'));

      return `${relativePath} @${version}`;
    });

  if (nestedNodeModules.length > 0) {
    throw new Error(`Nested node_modules found:\n- ${nestedNodeModules.join('\n- ')}\n`);
  }
};

await installComponents(components.packages);
