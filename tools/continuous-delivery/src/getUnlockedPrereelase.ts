import { readFile } from 'node:fs/promises';

export const getUnlockedPrerelease = async (
  pathToUikitPackage: string,
  log: (message: string) => void,
) => {
  log('Getting data about unlocked prerelease...');
  const semcoreUiPackageFile = await readFile(pathToUikitPackage, 'utf-8');
  const unlockedReleasesFiles = await readFile('.ci/.unlocked-releases.txt', 'utf-8');
  const semcoreUiPackage = JSON.parse(semcoreUiPackageFile);
  const unlockedReleases = unlockedReleasesFiles
    .split('\n')
    .map((line) => line.split('=')[0].replace(/^v/, ''))
    .filter(Boolean);

  if (
    unlockedReleases.includes(semcoreUiPackage.version) ||
    unlockedReleases.some((unlockedRelease) => unlockedRelease.includes(semcoreUiPackage.version))
  ) {
    log(`Found unlocked prerelease "${semcoreUiPackage.version}".`);
    return semcoreUiPackage.version;
  }

  return null;
};
