import { getReleaseChangelog } from '../getReleaseChangelog';
import { collectComponentChangelogs } from '../collectComponentChangelogs';
import type { Changelog } from '../types';
import fs from 'fs-extra';
import { resolve as resolvePath } from 'node:path';
import dayjs from 'dayjs';
import semver from 'semver';
import { fileURLToPath } from 'node:url';

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

export const patchReleaseChangelog = async (
  previousVersionId: string,
  previousDependencies: { [name: string]: string },
  exportedPackages: string[],
) => {
  const componentChangelogs = await collectComponentChangelogs();
  const releaseChangelog = await getReleaseChangelog();

  const exportedPackagesMap = Object.fromEntries(
    exportedPackages.map((packageName) => [packageName, true]),
  );

  let previousVersionIndex = releaseChangelog.changelogs.findIndex(
    (changelog) => changelog.version === previousVersionId,
  );

  if (previousVersionIndex === -1) {
    previousVersionIndex = 0;
  }

  const componentChanges = componentChangelogs.map(({ changelogs, package: component }) =>
    changelogs
      .filter((changelog) => exportedPackagesMap[changelog.component])
      .filter(
        ({ version }) =>
          !previousDependencies[component.name] ||
          semver.gt(version, previousDependencies[component.name]),
      )
      .map((changelog) => ({
        ...changelog,
        changes: changelog.changes.filter((change) => !change.isAutomatic),
      }))
      .filter(({ changes }) => changes.length > 0),
  );

  const componentChangedVersionIncrements = componentChanges.flatMap((changelogs) =>
    changelogs.map(({ version, component }) => {
      return previousDependencies[component]
        ? (semver.diff(previousDependencies[component], version) as semver.ReleaseType)
        : 'patch';
    }),
  );

  const releaseIncrement = componentChangedVersionIncrements.reduce(
    (max, current) =>
      orderedVersionIncrement.indexOf(current) < orderedVersionIncrement.indexOf(max)
        ? current
        : max,
    'patch' as semver.ReleaseType,
  );

  let updateIdentifier: string | undefined = undefined;
  if (releaseIncrement.startsWith('pre')) {
    for (const { version } of componentChanges.flat()) {
      const identifier = version.match(/-(\w+)\./)?.[1];
      if (!identifier) continue;
      updateIdentifier = identifier;
      break;
    }
  }

  const guessedVersion = semver.inc(
    previousVersionId,
    releaseIncrement,
    undefined,
    updateIdentifier,
  );

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
