import path from 'node:path';
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';
import { log } from '../utils';
import type { Changelog } from '@semcore/changelog-handler';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..', '..');

export function updateVersionInComponents(changelogs: Changelog[]) {
  log('Update version in components...');

  changelogs.forEach((pack) => {
    const [scope, name] = pack.component.split('/');
    const jsonPath = path.resolve(dirname, '..', '..', 'semcore', name, 'package.json');
    const packageJsonData = fs.readJSONSync(jsonPath);

    packageJsonData.version = pack.version;

    fs.writeJSONSync(jsonPath, packageJsonData, { spaces: 2 });
  });
}
