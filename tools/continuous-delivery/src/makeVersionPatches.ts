import semver from 'semver';
import { ChangelogChange } from '@semcore/changelog-handler';
import { Package } from './collectPackages';
import { normalizeSemver } from './utils';
import dayjs from 'dayjs';

export type VersionPatch = {
  package: Package;
  from: string;
  to: string;
  changes: ChangelogChange[];
  changelogUpdated: boolean;
};

const orderedReleaseType: semver.ReleaseType[] = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
];

export const makeVersionPatches = (packages: Package[]) => {
  const packagesMap = new Map<string, Package>();
  for (const packageFile of packages) {
    packagesMap.set(packageFile.name, packageFile);
  }
  const versionPatches: VersionPatch[] = [];
  const versionPatchesMap = new Map<string, VersionPatch>();

  const toCheck = [...packages];
  while (toCheck.length > 0) {
    const packageFile = toCheck.pop();

    if (versionPatchesMap.has(packageFile.name)) continue;

    const lastChangelog = packageFile.changelogs.find(
      (changelog) => !packageFile.isPrivate && dayjs(changelog.date).isValid(),
    );
    if (!lastChangelog) continue;

    if (packageFile.lastPublishedVersion === null) {
      throw new Error(`${packageFile.name} not found in npm registry`);
    }

    const hasNewerVersion =
      semver.compare(packageFile.lastPublishedVersion, lastChangelog.version) === -1;

    if (!hasNewerVersion) continue;

    const versionPatch: VersionPatch = {
      package: packageFile,
      from: packageFile.currentVersion,
      to: lastChangelog.version,
      changes: lastChangelog.changes,
      changelogUpdated: true,
    };
    versionPatchesMap.set(packageFile.name, versionPatch);
    versionPatches.push(versionPatch);
  }

  let recursiveChildrenUpdateCompleted = false;
  while (!recursiveChildrenUpdateCompleted) {
    recursiveChildrenUpdateCompleted = true;
    for (const packageFile of packages) {
      if (versionPatchesMap.has(packageFile.name)) continue;
      if (!packageFile.lastPublishedVersion) continue;

      let updateType: semver.ReleaseType | null = null;
      let updateTypeFallback: 'patch' | 'prerelease' = 'patch';
      let needUpdate = false;
      const updatedDependencies: { name: string; from: string; to: string }[] = [];

      for (const dependenciesType of ['dependencies', 'devDependencies']) {
        for (const dependency in packageFile[dependenciesType]) {
          const dependencyVersionPatch = versionPatchesMap.get(dependency);
          if (!dependencyVersionPatch) continue;
          needUpdate = true;

          updatedDependencies.push({
            name: dependency,
            from: dependencyVersionPatch.from,
            to: dependencyVersionPatch.to,
          });

          if (
            semver.prerelease(normalizeSemver(dependencyVersionPatch.to)) !== null &&
            updateTypeFallback !== 'prerelease'
          ) {
            updateTypeFallback = 'prerelease';
          }

          if (
            !semver.satisfies(dependencyVersionPatch.to, packageFile[dependenciesType][dependency])
          ) {
            const diffType = semver.diff(
              normalizeSemver(packageFile[dependenciesType][dependency]),
              normalizeSemver(dependencyVersionPatch.to),
            );

            if (
              updateType === null ||
              orderedReleaseType.indexOf(updateType) < orderedReleaseType.indexOf(diffType)
            ) {
              updateType = diffType;
            }
          }
        }
      }

      if (needUpdate) {
        const versionBase = semver.compare(
          packageFile.currentVersion,
          packageFile.lastPublishedVersion,
        )
          ? packageFile.currentVersion
          : packageFile.lastPublishedVersion;

        const version = semver.inc(versionBase, updateType || updateTypeFallback);
        const descriptionBefore = `Version ${
          updateType || updateTypeFallback
        } update due to children dependencies update (`;
        const description =
          descriptionBefore +
          updatedDependencies
            .map(({ name, from, to }) => `\`${name}\` [${from} ~> ${to}]`)
            .join(', ') +
          ').';

        const versionPatch: VersionPatch = {
          package: packageFile,
          from: packageFile.currentVersion,
          to: version,
          changes: [
            {
              component: packageFile.name,
              version,
              isAutomatic: true,
              label: 'Changed',
              description: description,
              descriptionFormatted: [description],
            },
          ],
          changelogUpdated: false,
        };
        versionPatchesMap.set(packageFile.name, versionPatch);
        versionPatches.push(versionPatch);
      }
    }
  }

  return versionPatches;
};
