import { collectPackages } from './src/collectPackages';
import { makeVersionPatches, orderedReleaseType } from './src/makeVersionPatches';
import { fetchFromNpm } from './src/fetchFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
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
  patchReleaseChangelog,
  serializeReleaseChangelog,
  getReleaseChangelog,
} from '@semcore/changelog-handler';
import semver from 'semver';
import { publishIntergalacticRelease } from './src/intg-release/publishRelease';
import { GitUtils } from './src/utils/gitUtils';
import { NpmUtils } from './src/utils/npmUtils';
import * as process from 'process';

export const initPrerelease = async () => {
  const npmData = await fetchFromNpm();
  const packages = await collectPackages(npmData);

  if (process.argv.includes('--check')) {
    await syncCheck(packages);
    process.exit();
  }

  const versionPatches = await makeVersionPatches(packages);

  if (versionPatches.length > 0) {
    await updateVersions(
      versionPatches.map((patch) => {
        return {
          name: patch.package.name,
          version: patch.to,
        };
      }),
    );
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
      if (!releaseType) releaseType = 'patch';
      const versionTo = semver.inc(pkg.currentVersion, releaseType)!;
      const patch = {
        package: pkg,
        from: pkg.currentVersion,
        to: versionTo,
        changes: [],
        changelogUpdated: true,
        needPublish: true,
      };
      await updateVersions([{ name: pkg.name, version: versionTo }]);
      versionPatches.push(patch);
    }

    await GitUtils.initNewPrerelease(versionPatches);
  }
};

export const publishPrerelease = async () => {
  const updatedPackages = await GitUtils.getUpdatedPackages();
  const prerelease = await GitUtils.getPrerelease();

  if (prerelease === null) {
    log('No prerelease info in current tag. Skip.');
    process.exit();
  }

  log('Update versions to prerelease...');
  await updateVersions(
    updatedPackages.map((pack) => {
      return {
        name: pack,
        prerelease,
      };
    }),
  );
  log('Updated versions to prerelease.');

  await NpmUtils.publish(updatedPackages, true);
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
  const tarballPaths = await downloadTarballs(tarballUrls, '.tmp/prerelease');
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
