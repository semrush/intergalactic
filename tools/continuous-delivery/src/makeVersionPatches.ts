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

  const sortedPatches = reversedTopologicalSort(versionPatches);

  return sortedPatches;
};

const reversedTopologicalSort = (patches: VersionPatch[]) => {
  const patchesMap = new Map<string, VersionPatch>();
  const rootPatches = new Set(patches);
  for (const patch of patches) {
    patchesMap.set(patch.package.name, patch);
  }
  for (const patch of patches) {
    for (const dependency in patch.package.dependencies) {
      rootPatches.delete(patchesMap.get(dependency));
    }
  }
  const sumPatchPriority = new Map<VersionPatch, number>();

  for (const rootPatch of rootPatches) {
    // Tarjan algo. Only difference that we already know root.
    // https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm

    const patchIndex = new Map<VersionPatch, number>();
    const patchPriority = new Map<VersionPatch, number>();
    const patchLowLink = new Map<VersionPatch, number>();
    let index = 0;
    const stack: VersionPatch[] = [];
    const onStack = new Map<VersionPatch, boolean>();

    const strongconnect = (patch: VersionPatch) => {
      patchIndex.set(patch, index);
      patchLowLink.set(patch, index);
      index++;
      stack.push(patch);
      onStack.set(patch, true);

      for (const dependency in patch.package.dependencies) {
        const dependantPatch = patchesMap.get(dependency);
        if (!dependantPatch) continue;
        if (!patchIndex.has(dependantPatch)) {
          strongconnect(dependantPatch);
          patchLowLink.set(
            patch,
            Math.min(patchLowLink.get(patch), patchLowLink.get(dependantPatch)),
          );
        } else if (onStack.get(dependantPatch)) {
          patchLowLink.set(
            patch,
            Math.min(patchLowLink.get(patch), patchIndex.get(dependantPatch)),
          );
        }
      }

      if (patchLowLink.get(patch) === patchIndex.get(patch)) {
        let dependantPatch: VersionPatch | null = null;
        let priority = 0;
        while (dependantPatch !== patch) {
          dependantPatch = stack.pop();
          onStack.set(dependantPatch, false);
          priority += patchLowLink.get(dependantPatch);
        }
        priority += patchLowLink.get(patch);
        patchPriority.set(patch, priority);
      }
    };

    strongconnect(rootPatch);

    for (const patch of patches) {
      sumPatchPriority.set(
        patch,
        (sumPatchPriority.get(patch) || 0) + (patchPriority.get(patch) || 0),
      );
    }
  }

  return [...patches].sort((a, b) => sumPatchPriority.get(b) - sumPatchPriority.get(a));
};
