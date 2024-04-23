import { collectPackages } from './src/collectPackages';
import { makeVersionPatches, orderedReleaseType } from './src/makeVersionPatches';
import { fetchFromNpm } from './src/fetchFromNpm';
import { updateVersions } from './src/updateVersions';
import { updateChangelogs } from './src/updateChangelogs';
import { syncCheck } from './src/syncCheck';
import { formatMarkdown, log } from './src/utils';
import { getUnlockedPrerelease } from './src/getUnlockedPrereelase';
import { publishReleaseNotes } from './src/publishReleaseNotes';
import {
  updateReleaseChangelog,
  patchReleaseChangelog,
  serializeReleaseChangelog,
  getReleaseChangelog,
} from '@semcore/changelog-handler';
import semver from 'semver';
import { GitUtils } from './src/utils/gitUtils';
import { NpmUtils } from './src/utils/npmUtils';
import * as process from 'process';
import { closeTasks } from './src/intg-release/closeTasks';
import {
  updateIntergalacticChangelog,
  setIntergalacticPrereleaseVersion,
  generateIntergalacticCodeBeforePublish,
} from './src/intg-release/publishUtils';
import { sendMessageAboutRelease } from './src/sendMessageAboutRelease';

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

    await updateIntergalacticChangelog();

    await GitUtils.initNewPrerelease(versionPatches);
  }
};

export const uploadStatic = async () => {
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

  const pnpmFilter = updatedPackages.map((pack) => `--filter ${pack}`).join(' ');

  await NpmUtils.uploadStatic(pnpmFilter);
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

  await setIntergalacticPrereleaseVersion(prerelease);
  await generateIntergalacticCodeBeforePublish();
  log('Updated versions to prerelease.');

  await NpmUtils.publish(updatedPackages.concat('intergalactic'), true);
};

export const publishRelease = async () => {
  const updatedPackages = await GitUtils.getUpdatedPackages();
  const versionTag = await GitUtils.getCurrentTag();
  const version = versionTag?.slice(1);

  await generateIntergalacticCodeBeforePublish();

  // all semcore/* + intergalactic
  await NpmUtils.publish(updatedPackages.concat('intergalactic'), false);

  // 8) Close tasks in clickup
  if (!process.argv.includes('--dry-run') && version) {
    await closeTasks(version);
  }

  if (!process.argv.includes('--dry-run') && version) {
    const releaseChangelog = await getReleaseChangelog();
    const lastVersionChangelogs = releaseChangelog.changelogs.slice(0, 1);

    await publishReleaseNotes(version, lastVersionChangelogs);

    await sendMessageAboutRelease(version, lastVersionChangelogs);
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
