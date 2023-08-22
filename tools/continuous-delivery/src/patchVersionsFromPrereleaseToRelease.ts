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
  await Promise.all(
    packagesPaths.map(async (path) => {
      const packageFilePath = resolvePath(path, 'package.json');
      const packageFile = await fs.readJson(packageFilePath);
      if (packageFile.version.includes('-')) {
        packageFile.version = packageFile.version.split('-')[0];
      }
      for (const dependency in packageFile.dependencies ?? {}) {
        if (packageFile.dependencies[dependency].includes('-')) {
          packageFile.dependencies[dependency] = packageFile.dependencies[dependency].split('-')[0];
        }
      }
      await fs.writeJson(packageFilePath, packageFile, { spaces: 2 });
      affectedPackages.add(packageFile.name);
    }),
  );
  log('Patched versions from prerelease to release.');

  return packages
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
};
