import semver from 'semver';
import { Package, Version } from './collectPackages';
import { normalizeSemver } from './utils';

export type VersionPatch = {
  package: Package;
  from: string;
  to: string;
  notes: Version['notes'];
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

    const lastVersion = packageFile.versions.find(
      (version) => !packageFile.isPrivate && !version.isPrivate,
    );
    if (!lastVersion) continue;

    const hasNewerVersion =
      semver.compare(packageFile.lastPublishedVersion, lastVersion.version) === -1;

    if (!hasNewerVersion) continue;

    const versionPatch: VersionPatch = {
      package: packageFile,
      from: packageFile.currentVersion,
      to: lastVersion.version,
      notes: lastVersion.notes,
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

      let updateType: semver.ReleaseType | null = null;
      let updateTypeFallback: 'patch' | 'prerelease' = 'patch';
      let needUpdate = false;

      for (const dependenciesType of ['dependencies', 'devDependencies']) {
        for (const dependency in packageFile[dependenciesType]) {
          const dependencyVersionPatch = versionPatchesMap.get(dependency);
          if (!dependencyVersionPatch) continue;
          needUpdate = true;

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
        recursiveChildrenUpdateCompleted = false;
        const versionBase = semver.compare(
          packageFile.currentVersion,
          packageFile.lastPublishedVersion,
        )
          ? packageFile.currentVersion
          : packageFile.lastPublishedVersion;

        const version = semver.inc(versionBase, updateType || updateTypeFallback);

        const versionPatch: VersionPatch = {
          package: packageFile,
          from: packageFile.currentVersion,
          to: version,
          notes: {
            ['Changed']: [
              {
                type: 'list',
                body: [{ type: 'listitem', text: ['Updated children dependencies'] }],
                ordered: false,
              },
            ],
          },
          changelogUpdated: false,
        };
        versionPatchesMap.set(packageFile.name, versionPatch);
        versionPatches.push(versionPatch);
      }
    }
  }

  return versionPatches;
};
