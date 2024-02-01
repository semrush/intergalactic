import { collectPackages } from './src/collectPackages';
import { makeVersionPatches, orderedReleaseType } from './src/makeVersionPatches';
import { fetchFromNpm } from './src/fetchFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
import { runPublisher } from './src/runPublisher';
import { syncCheck } from './src/syncCheck';
import { formatMarkdown, log, prerelaseSuffix } from './src/utils';
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
  patchReleaseChangelog,
  serializeReleaseChangelog,
  getReleaseChangelog,
} from '@semcore/changelog-handler';
import semver from 'semver';
import { publishIntergalacticRelease } from './src/intg-release/publishRelease';

export const deliverPrerelease = async () => {
  const npmData = await fetchFromNpm();
  const packages = await collectPackages(npmData);

  if (process.argv.includes('--check')) {
    await syncCheck(packages);
    process.exit();
  }

  const versionPatches = await makeVersionPatches(packages);

  if (versionPatches.length > 0) {
    await updateVersions(versionPatches);
    await updateChangelogs(versionPatches.filter((patch) => patch.package.name !== '@semcore/ui'));
    await updateReleaseChangelog();

    if (!versionPatches.find((patch) => patch.package.name === '@semcore/ui')) {
      const pkg = packages.find((pkg) => pkg.name === '@semcore/ui')!;
      const diffs = versionPatches.map((patch) => semver.diff(patch.from, patch.to));
      if (diffs.includes('major') || diffs.includes('premajor')) {
        throw new Error(
          'Unexpected major release preventer is here. Comment this line if you sure that you really want to release major version.',
        );
      }
      let releaseType = diffs.sort(
        (a, b) => orderedReleaseType.indexOf(a!) - orderedReleaseType.indexOf(b!),
      )[0];
      if (!releaseType) releaseType = 'prepatch';
      if (!releaseType.startsWith('pre')) releaseType = ('pre' + releaseType) as semver.ReleaseType;
      const patch = {
        package: pkg,
        from: pkg.currentVersion,
        to: semver.inc(pkg.currentVersion, releaseType, undefined, prerelaseSuffix)!,
        changes: [],
        changelogUpdated: true,
        needPublish: true,
      };
      await updateVersions([patch]);
      versionPatches.push(patch);
    }
    await runPublisher(versionPatches);
  }
};

export const publishRelease = async () => {
  const unlockedRelease = await getUnlockedPrerelease('semcore/ui/package.json', log);
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
  await updateChangelogs(versionPatches.filter((patch) => patch.package.name !== '@semcore/ui'));

  const releaseChangelog = await getReleaseChangelog();

  await removeBetaVersionFromReleaseChangelog(releaseChangelog.changelogs);

  /** publish intergalactic */
  await publishIntergalacticRelease();
  /** publish intergalactic */

  await republishTarballs(packagesPaths);
  if (!process.argv.includes('--dry-run')) {
    await commitVersionsPatch();
  }
  if (!process.argv.includes('--dry-run')) {
    await publishReleaseNotes(
      releaseChangelog.package.version,
      releaseChangelog.changelogs.slice(0, 1),
    );
  }
};

export {
  fetchFromNpm,
  formatMarkdown,
  collectPackages,
  patchReleaseChangelog,
  serializeReleaseChangelog,
  publishReleaseNotes,
  getUnlockedPrerelease,
};
