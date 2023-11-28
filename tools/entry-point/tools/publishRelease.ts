import { copyLib } from './copyLibs';
import { updateReleaseChangelog } from './updateReleaseChangelog';
import { updateComponentsVersions } from './updateComponentsVersions';
import { publishReleaseNotes, getUnlockedPrerelease } from '@semcore/continuous-delivery';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import { commitPatch } from './commitPatch';
import { publishTarball } from './publishTarball';
import { log } from '@semcore/continuous-delivery/src/utils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

const publishRelease = async () => {
  if (!process.argv.includes('--dry-run')) {
    throw new Error('on test use dry-run');
  }

  const packageJsonFilePath = path.resolve(dirname, 'package.json');

  const unlockedRelease = await getUnlockedPrerelease(packageJsonFilePath);
  if (!unlockedRelease) {
    log('No unlocked prerelease found.');
    return;
  }

  const packageJson = fs.readJSONSync(packageJsonFilePath);
  const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
  const packages = Object.keys(deps);

  // 1) Copy all built code
  await copyLib(packages);

  // 2) Update changelog
  const { changelogs, version } = await updateReleaseChangelog(packageJson, deps);

  // 3) Update version in package.json
  packageJson.version = version;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });

  // 4) Update versions in components.json
  updateComponentsVersions(packages, changelogs);

  // 5) Publish package
  await publishTarball(packageJson.name);

  // 6) Commit changes in package.json and components.json
  if (!process.argv.includes('--dry-run') && version) {
    await commitPatch(version);
  }

  // 7) Release notes in slack channel
  if (!process.argv.includes('--dry-run') && version) {
    await publishReleaseNotes(version, changelogs.slice(0, 1));
  }
};

export { publishRelease };
