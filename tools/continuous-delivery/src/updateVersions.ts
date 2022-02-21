import { VersionPatch } from './makeVersionPatches';
import { resolve as resolvePath } from 'path';
import fs from 'fs-extra';
import semver from 'semver';
import { carefulVersionUpdate } from './utils';

export const updateVersions = async (versionPatches: VersionPatch[]) => {
  const packageFiles = await Promise.all(
    versionPatches.map((patch) => fs.readJson(resolvePath(patch.package.path, 'package.json'))),
  );
  const setVersions: { [packageName: string]: string } = {};
  for (const patch of versionPatches) {
    setVersions[patch.package.name] = patch.to;
  }
  for (const packageFile of packageFiles) {
    if (setVersions[packageFile.name]) {
      packageFile.version = carefulVersionUpdate(
        packageFile.version,
        setVersions[packageFile.name],
      );
    }
    for (const dependenciesType of ['dependencies', 'devDependencies']) {
      for (const dependency in packageFile[dependenciesType]) {
        if (
          setVersions[dependency] &&
          !semver.satisfies(setVersions[dependency], packageFile[dependenciesType][dependency])
        ) {
          packageFile[dependenciesType][dependency] = carefulVersionUpdate(
            packageFile[dependenciesType][dependency],
            setVersions[dependency],
          );
        }
      }
    }
  }
  await Promise.all(
    versionPatches.map((patch, index) =>
      fs.writeJson(resolvePath(patch.package.path, 'package.json'), packageFiles[index], {
        spaces: 2,
      }),
    ),
  );
};
