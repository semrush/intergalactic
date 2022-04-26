import { getReleaseChangelog } from '../getReleaseChangelog';
import { collectComponentChangelogs } from '../collectComponentChangelogs';
import { Changelog } from '../types';
import fs from 'fs-extra';
import { resolve as resolvePath } from 'path';
import dayjs from 'dayjs';
import semver from 'semver';
import { fileURLToPath } from 'url';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(isBetween);

const filename = fileURLToPath(import.meta.url);

const orderedVersionIncrement: semver.ReleaseType[] = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
];

export const patchReleaseChangelog = async (previousVersionId: string) => {
  const componentChangelogs = await collectComponentChangelogs();
  const releaseChangelog = await getReleaseChangelog();

  const { packages: exportedPackages }: { packages: string[] } = await fs.readJSON(
    resolvePath(filename, '../../../../../semcore/ui/components.json'),
  );
  const exportedPackagesMap = Object.fromEntries(
    exportedPackages.map((packageName) => [packageName, true]),
  );

  const previousVersionIndex = releaseChangelog.changelogs.findIndex(
    (changelog) => changelog.version === previousVersionId,
  );
  const previousVersion = releaseChangelog.changelogs[previousVersionIndex];
  const previousVersionDate = previousVersion?.date;
  const versionDate =
    releaseChangelog.changelogs[previousVersionIndex - 1]?.date ||
    dayjs().add(1, 'day').format('YYYY-MM-DD');

  const componentChanges = componentChangelogs.map(({ changelogs }) =>
    changelogs
      .filter((changelog) => exportedPackagesMap[changelog.component])
      .filter(
        ({ date }) =>
          dayjs(date).isValid() &&
          dayjs(date).isBetween(previousVersionDate, versionDate, 'd', '[)'),
      )
      .map((changelog) => ({
        ...changelog,
        changes: changelog.changes.filter((change) => !change.isAutomatic),
      }))
      .filter(({ changes }) => changes.length > 0),
  );

  const componentChangedVersionIncrements = componentChanges
    .map((changelogs) =>
      changelogs.map(({ version }, index) => {
        return changelogs[index + 1]?.version
          ? (semver.diff(changelogs[index + 1]?.version, version) as semver.ReleaseType)
          : 'patch';
      }),
    )
    .flat();

  const releaseIncrement = componentChangedVersionIncrements.reduce(
    (max, current) =>
      orderedVersionIncrement.indexOf(current) < orderedVersionIncrement.indexOf(max)
        ? current
        : max,
    'patch' as semver.ReleaseType,
  );

  const guessedVersion = semver.inc(previousVersionId, releaseIncrement);

  const versionChangelog: Changelog = releaseChangelog.changelogs[previousVersionIndex - 1] ?? {
    component: releaseChangelog.package.name,
    date: dayjs().format('YYYY-MM-DD'),
    version: guessedVersion,
    changes: [],
  };

  versionChangelog.changes = componentChanges
    .map((changelogs) => changelogs.map(({ changes }) => changes))
    .flat(2);

  if (!releaseChangelog.changelogs.includes(versionChangelog)) {
    releaseChangelog.changelogs.splice(previousVersionIndex, 0, versionChangelog);
  }

  return { changelogs: releaseChangelog.changelogs, version: guessedVersion };
};
