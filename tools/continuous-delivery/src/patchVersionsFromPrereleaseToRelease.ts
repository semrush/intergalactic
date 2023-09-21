import fs from 'fs-extra';
import { Package } from './collectPackages';
import { log } from './utils';
import { resolve as resolvePath } from 'path';
import { VersionPatch } from './makeVersionPatches';

export const patchVersionsFromPrereleaseToRelease = async (
  packagesPaths: string[],
  packages: Package[],
) => {
  log('Patching versions from prerelease to release...');
  const affectedPackages = new Set<string>();
  const internalPackages = new Set(packages.map((pkg) => pkg.name));
  await Promise.all(
    packagesPaths.map(async (path) => {
      const packageFilePath = resolvePath(path, 'package.json');
      const packageFile = await fs.readJson(packageFilePath);
      if (packageFile.version.includes('-')) {
        packageFile.version = packageFile.version.split('-')[0];
      }
      for (const dependencyType of ['dependencies', 'peerDependencies'] as const) {
        for (const dependency in packageFile[dependencyType] ?? {}) {
          if (
            internalPackages.has(dependency) &&
            packageFile[dependencyType]?.[dependency]?.includes('-')
          ) {
            packageFile[dependencyType][dependency] =
              packageFile[dependencyType][dependency].split('-')[0];
          }
        }
      }
      await fs.writeJson(packageFilePath, packageFile, { spaces: 2 });
      affectedPackages.add(packageFile.name);
    }),
  );
  await Promise.all(
    packages.map(async (pkg) => {
      const packageFilePath = resolvePath(pkg.path, 'package.json');
      const packageFile = await fs.readJson(packageFilePath);
      if (packageFile.version.includes('-')) {
        packageFile.version = packageFile.version.split('-')[0];
      }
      for (const dependencyType of ['dependencies', 'peerDependencies'] as const) {
        for (const dependency in packageFile[dependencyType] ?? {}) {
          if (
            internalPackages.has(dependency) &&
            packageFile[dependencyType]?.[dependency]?.includes('-')
          ) {
            packageFile[dependencyType][dependency] =
              packageFile[dependencyType][dependency].split('-')[0];
          }
        }
      }
      await fs.writeJson(packageFilePath, packageFile, { spaces: 2 });
      affectedPackages.add(packageFile.name);
    }),
  );
  log('Patched versions from prerelease to release.');

  const versionPatches = packages
    .filter(({ name }) => affectedPackages.has(name))
    .map(
      (pkg): VersionPatch => ({
        package: pkg,
        from: pkg.currentVersion,
        to: pkg.currentVersion.substring(0, pkg.currentVersion.indexOf('-')),
        changes: [],
        changelogUpdated: false,
        needPublish: true,
      }),
    );

  {
    /** @semcore/table is not included in @semcore/ui but still maintained, so it never appears in affected packages list */
    const pkg = packages.find((pkg) => pkg.name === '@semcore/table')!;
    if (pkg.currentVersion.includes('-')) {
      versionPatches.push({
        package: pkg,
        from: pkg.currentVersion,
        to: pkg.currentVersion.substring(0, pkg.currentVersion.indexOf('-')),
        changes: [],
        changelogUpdated: false,
        needPublish: true,
      });
    }
  }

  return versionPatches;
};
