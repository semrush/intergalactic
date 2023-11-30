import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { log } from './logger';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

export function updateComponentsVersions(packages: string[]) {
  log('Update components versions...');

  const newDeps: Record<string, string> = {};

  packages.forEach((pack) => {
    const [scope, name] = pack.split('/');
    const from = path.resolve(dirname, '..', '..', 'semcore', name, 'package.json');
    const packageJsonData = fs.readJSONSync(from);

    newDeps[pack] = packageJsonData.version;
  });

  fs.writeJSONSync(path.resolve(dirname, 'components.json'), newDeps, { spaces: 2 });
}
