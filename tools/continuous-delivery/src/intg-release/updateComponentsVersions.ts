import path from 'node:path';
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';
import { log } from '../utils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..', '..', '..', 'entry-point');

export function updateComponentsVersions(packages: string[], componentJsonPath: string) {
  log('Update components versions...');

  const newDeps: Record<string, string> = {};

  packages.forEach((pack) => {
    const [scope, name] = pack.split('/');
    const from = path.resolve(dirname, '..', '..', 'semcore', name, 'package.json');
    const packageJsonData = fs.readJSONSync(from);

    newDeps[pack] = packageJsonData.version;
  });

  fs.writeJSONSync(componentJsonPath, newDeps, { spaces: 2 });
}
