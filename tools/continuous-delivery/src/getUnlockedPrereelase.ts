import { readFile } from 'fs/promises';
import { log } from './utils';

export const getUnlockedPrerelease = async () => {
  log('Getting data about unlocked prerelease...');
  const semcoreUiPackageFile = await readFile('semcore/ui/package.json', 'utf-8');
  const unlockedReleasesFiles = await readFile('.ci/.unlocked-releases.txt', 'utf-8');
  const semcoreUiPackage = JSON.parse(semcoreUiPackageFile);
  const unlockedReleases = unlockedReleasesFiles
    .split('\n')
    .map((line) => line.split('=')[0].replace(/^v/, ''))
    .filter(Boolean);

  if (unlockedReleases.includes(semcoreUiPackage.version)) {
    log(`Found unlocked prerelease "${semcoreUiPackage.version}".`);
    return semcoreUiPackage.version;
  }

  return null;
};
