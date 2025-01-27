import { dirname as resolveDirname, resolve as resolvePath } from 'node:path';
import fs from 'fs-extra';
import semver from 'semver';
import { carefulVersionUpdate, log } from './utils';
import { fileURLToPath } from 'node:url';

type VersionPatch =
  | {
      name: string; // @semcore/COMPONENT from package.json
      version: string;
    }
  | {
      name: string;
      prerelease: string;
    };

const dirname = resolveDirname(fileURLToPath(import.meta.url));

const getPathToPackage = (name: VersionPatch['name']) => {
  const componentName = name.split('semcore/')[1];
  return resolvePath(dirname, '..', '..', '..', 'semcore', componentName, 'package.json');
};

export const updateVersions = async (versionPatches: VersionPatch[]) => {
  log('Updating package.json files versions...');
  const packageFiles = await Promise.all(
    versionPatches.map((patch) => fs.readJson(getPathToPackage(patch.name))),
  );
  const setVersions: { [packageName: string]: string } = {};
  for (const patch of versionPatches) {
    if ('version' in patch) {
      setVersions[patch.name] = patch.version;
    } else {
      const patchPackage = packageFiles.find((p) => p.name === patch.name);

      if (patchPackage) {
        setVersions[patchPackage.name] = `${patchPackage.version}-${patch.prerelease}`;
      }
    }
  }
  for (const packageFile of packageFiles) {
    if (setVersions[packageFile.name]) {
      packageFile.version = carefulVersionUpdate(
        packageFile.version,
        setVersions[packageFile.name],
      );
    }
    for (const dependenciesType of ['dependencies', 'peerDependencies']) {
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
      fs.writeJson(getPathToPackage(patch.name), packageFiles[index], {
        spaces: 2,
      }),
    ),
  );
  log('package.json files versions updated.');
};
