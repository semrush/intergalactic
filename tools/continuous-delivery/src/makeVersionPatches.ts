import semver from 'semver';
import { ChangelogChange } from '@semcore/changelog-handler';
import { Package } from './collectPackages';
import { log, normalizeSemver, prerelaseSuffix, prereleaseBaseIndex } from './utils';
import dayjs from 'dayjs';
import { reversedTopologicalSort } from './reversedTolopologicalSort';

export type VersionPatch = {
  package: Package;
  from: string;
  to: string;
  changes: ChangelogChange[];
  changelogUpdated: boolean;
  needPublish: boolean;
};

export const orderedReleaseType: semver.ReleaseType[] = ['major', 'minor', 'patch'];

const maxSemver = (v1: string, v2: string) => (semver.compare(v1, v2) === 1 ? v1 : v2);

export const makeVersionPatches = (packages: Package[]) => {
  log('Making version patches...');

  const packagesMap = new Map<string, Package>();
  for (const packageFile of packages) {
    packagesMap.set(packageFile.name, packageFile);
  }
  const versionPatches: VersionPatch[] = [];
  const versionPatchesMap = new Map<string, VersionPatch>();

  // patching packages that are locally (by changelog) ahead of npm registry
  const toCheck = [...packages];
  while (toCheck.length > 0) {
    const packageFile = toCheck.pop()!;

    if (versionPatchesMap.has(packageFile.name)) continue;

    let lastChangelog = packageFile.changelogs.find(
      (changelog) => !packageFile.isPrivate && dayjs(changelog.date).isValid(),
    );

    if (packageFile.name === '@semcore/ui') {
      lastChangelog = {
        component: packageFile.name,
        date: new Date().toString(),
        version: packageFile.currentVersion,
        changes: [],
      };
    }

    if (!lastChangelog) continue;

    const newVersion =
      packageFile.lastPublishedVersion === null
        ? packageFile.currentVersion
        : maxSemver(packageFile.currentVersion, packageFile.lastPublishedVersion);
    const hasNewerVersion = semver.compare(newVersion, lastChangelog.version) === -1;

    if (!hasNewerVersion && newVersion !== '16.0.0') continue;

    if (lastChangelog.changes[0]) {
      lastChangelog.changes[0].version = lastChangelog.version;
    }
    const versionPatch: VersionPatch = {
      package: packageFile,
      from: packageFile.currentVersion,
      to: lastChangelog.version, //semver.inc(lastChangelog.version, 'prerelease', undefined, 'beta')!, // ?? lastChangelog.version,
      changes: lastChangelog.changes,
      changelogUpdated: true,
      needPublish: true,
    };
    versionPatchesMap.set(packageFile.name, versionPatch);
    versionPatches.push(versionPatch);
  }

  // patching packages that are locally (by dependencies) ahead of npm registry
  let recursiveChildrenUpdateCompleted = false;
  while (!recursiveChildrenUpdateCompleted) {
    recursiveChildrenUpdateCompleted = true;
    for (const packageFile of packages) {
      if (versionPatchesMap.has(packageFile.name)) continue;
      // if (!packageFile.lastPublishedVersion) continue;
      if (packageFile.name === '@semcore/ui') continue;

      let updateType: semver.ReleaseType | null = null;
      let updateIdentifier: string | undefined = undefined;
      const updateTypeFallback = 'patch';
      let needUpdate = false;
      const updatedDependencies: { name: string; from: string; to: string }[] = [];

      for (const dependenciesType of ['dependencies', 'peerDependencies']) {
        for (const dependency in packageFile[dependenciesType as 'dependencies']) {
          const dependencyVersionPatch = versionPatchesMap.get(dependency);
          if (!dependencyVersionPatch) continue;
          needUpdate = true;

          updatedDependencies.push({
            name: dependency,
            from: dependencyVersionPatch.from,
            to: dependencyVersionPatch.to,
          });

          if (
            !semver.satisfies(
              dependencyVersionPatch.to,
              packageFile[dependenciesType as 'dependencies'][dependency],
            )
          ) {
            const diffType = semver.diff(
              normalizeSemver(packageFile[dependenciesType as 'dependencies'][dependency]),
              normalizeSemver(dependencyVersionPatch.to),
            );

            if (
              updateType === null ||
              orderedReleaseType.indexOf(updateType) < orderedReleaseType.indexOf(diffType!)
            ) {
              updateType = diffType;
              updateIdentifier = dependencyVersionPatch.to.match(/-(\w+)\./)?.[1];
            }
          }
        }
      }

      if (needUpdate) {
        const versionBase = semver.compare(
          packageFile.currentVersion,
          packageFile.lastPublishedVersion ?? packageFile.currentVersion,
        )
          ? packageFile.currentVersion
          : packageFile.lastPublishedVersion ?? packageFile.currentVersion;

        const version = semver.inc(versionBase, updateType || updateTypeFallback)!;
        const updateTypeLabel = updateType || updateTypeFallback;
        const descriptionBefore = `Version ${updateTypeLabel} update due to children dependencies update (`;
        const updatedDependenciesList = updatedDependencies
          .map(({ name, from, to }) => {
            const clearTo = to.split('-')[0];
            return `\`${name}\` [${from} ~> ${clearTo}]`;
          })
          .join(', ');
        const description = `${descriptionBefore}${updatedDependenciesList}).`;

        const versionPatch: VersionPatch = {
          package: packageFile,
          from: packageFile.currentVersion,
          to: version!,
          changes: [
            {
              component: packageFile.name,
              version: version!,
              isAutomatic: true,
              label: 'Changed',
              description: description,
              descriptionFormatted: [description],
            },
          ],
          changelogUpdated: false,
          needPublish: true,
        };
        versionPatchesMap.set(packageFile.name, versionPatch);
        versionPatches.push(versionPatch);
      }
    }
  }

  // patching packages that are locally (by package.json) behind the npm registry
  for (const packageFile of packages) {
    if (versionPatchesMap.has(packageFile.name)) continue;
    if (packageFile.lastPublishedVersion === null) continue;
    if (semver.compare(packageFile.currentVersion, packageFile.lastPublishedVersion) === -1) {
      const versionPatch: VersionPatch = {
        package: packageFile,
        from: packageFile.currentVersion,
        to: packageFile.lastPublishedVersion,
        changes: [],
        changelogUpdated: false,
        needPublish: false,
      };
      versionPatchesMap.set(packageFile.name, versionPatch);
      versionPatches.push(versionPatch);
    }
  }

  const sortedPatches = reversedTopologicalSort(
    versionPatches.map((patch) => ({
      data: patch,
      name: patch.package.name,
      dependencies: Object.keys(patch.package.dependencies),
    })),
  );

  log('Made and sorted versions patches.');

  return sortedPatches;
};
