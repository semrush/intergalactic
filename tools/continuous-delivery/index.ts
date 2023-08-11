import { collectPackages } from './src/collectPackages';
import { makeVersionPatches } from './src/makeVersionPatches';
import { fetchFromNpm } from './src/fetchFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
import { runPublisher } from './src/runPublisher';
import { syncCheck } from './src/syncCheck';
import { formatMarkdown, log } from './src/utils';
import { getUnlockedPrerelease } from './src/getUnlockedPrereelase';
import { publishReleaseNotes } from './src/publishReleaseNotes';
import { collectTarballs } from './src/collectTarballs';
import { downloadTarballs } from './src/downloadTarballs';
import { unpackTarballs } from './src/unpackTarballs';
import { patchVersionsFromPrereleaseToRelease } from './src/patchVersionsFromPrereleaseToRelease';
import { republishTarballs } from './src/republishTarballs';
import { commitVersionsPatch } from './src/commitVersionsPatch';
import {
  removeBetaVersionFromReleaseChangelog,
  updateReleaseChangelog,
} from '@semcore/changelog-handler';

export const deliverPrerelease = async () => {
  const npmData = await fetchFromNpm();
  let packages = await collectPackages(npmData);

  if (process.argv.includes('--check')) {
    await syncCheck(packages);
    process.exit();
  }

  let versionPatches = await makeVersionPatches(packages);

  if (versionPatches.length > 0) {
    await updateVersions(versionPatches);
    await updateChangelogs(versionPatches.filter((patch) => patch.package.name !== '@semcore/ui'));
    await updateReleaseChangelog();

    packages = await collectPackages(npmData);
    versionPatches = await makeVersionPatches(packages);
    await updateVersions(versionPatches.filter((patch) => patch.package.name === '@semcore/ui'));
    await runPublisher(versionPatches);
  }
};

export const publishRelease = async () => {
  const unlockedRelease = await getUnlockedPrerelease();
  if (!unlockedRelease) {
    log('No unlocked prerelease found.');
    return;
  }
  const npmData = await fetchFromNpm();
  const packages = await collectPackages(npmData);
  const tarballUrls = await collectTarballs(unlockedRelease);
  const tarballPaths = await downloadTarballs(tarballUrls);
  const packagesPaths = await unpackTarballs(tarballPaths);
  const versionPatches = await patchVersionsFromPrereleaseToRelease(packagesPaths, packages);
  await updateVersions(versionPatches);
  await updateChangelogs(versionPatches.filter((patch) => patch.package.name !== '@semcore/ui'));
  await removeBetaVersionFromReleaseChangelog();

  await republishTarballs(packagesPaths);
  if (!process.argv.includes('--dry-run')) {
    await commitVersionsPatch(packages);
  }
  if (!process.argv.includes('--dry-run')) {
    await publishReleaseNotes();
  }
};

export { fetchFromNpm, formatMarkdown, collectPackages };
