import { fileURLToPath } from 'node:url';
import { resolve as resolvePath } from 'node:path';
import { log } from '../utils';
import fs from 'fs-extra';
import path from 'node:path';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '..', '..', '..', '..', 'entry-point');

export async function updateExternalDeps(packageJson: Record<string, any>, packages: string[]) {
  log('Update Release Dependencies...');

  const externalDependencies: Record<string, string> = {};

  await Promise.all(
    packages.map(async (dep) => {
      const [scope, name] = dep.split('/');
      const packageData = await fs.readJSON(
        path.resolve(releasePackageDir, '..', '..', 'semcore', name, 'package.json'),
      );

      Object.entries<string>(packageData.dependencies || {}).forEach(([key, version]) => {
        if (!key.startsWith('@semcore')) {
          if (!externalDependencies[key]) {
            externalDependencies[key] = version;
          } else if (externalDependencies[key] !== version) {
            log(
              `already has [${key}] with version [${externalDependencies[key]}]. Tried to add [${version}]`,
            );
          }
        }
      });
    }),
  );

  log(
    `deps to add:\n${Object.entries(externalDependencies)
      .map(([key, version]) => `    ${key}: ${version}`)
      .join('\n')}`,
  );

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...externalDependencies,
  };

  await fs.writeFile(
    path.resolve(releasePackageDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n',
  );
}
