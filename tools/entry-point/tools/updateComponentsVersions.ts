import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { log } from './logger';
import { Changelog } from '@semcore/changelog-handler';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

export function updateComponentsVersions(
  packages: string[],
  changelogs: Changelog[],
  shortHash?: string,
) {
  log('Update components versions...');

  const newDeps: Record<string, string> = {};

  packages.forEach((pack) => {
    const [scope, name] = pack.split('/');
    const from = path.resolve(dirname, '..', '..', 'semcore', name, 'package.json');
    const packageJsonData = fs.readJSONSync(from);

    newDeps[pack] = packageJsonData.version;
  });

  changelogs
    .filter((changelog) => changelog.component !== '@semcore/ui')
    .forEach((changelog) => {
      const newDepsVersion = newDeps[changelog.component];

      if (newDepsVersion !== changelog.version) {
        newDeps[changelog.component] = shortHash
          ? `${changelog.version}-prerelease-${shortHash}`
          : changelog.version;
      }
    });

  fs.writeJSONSync(path.resolve(dirname, 'components.json'), newDeps, { spaces: 2 });
}
