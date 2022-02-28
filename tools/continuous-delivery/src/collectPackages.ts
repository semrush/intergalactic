import { resolve as resolvePath } from 'path';
import fs from 'fs-extra';
import { isValidSemver } from './utils';
import { componentChangelogParser, Changelog } from '@semcore/changelog-handler';

export type Package = {
  name: string;
  path: string;
  isPrivate: boolean;
  changelogs: Changelog[];
  currentVersion: string;
  lastPublishedVersion: string | null;
  dependencies: { [dependencyName: string]: string };
};

export const collectPackages = async (inNpmVersions: { [packageName: string]: string }) => {
  const packagePaths = [
    ...(await fs.readdir(resolvePath('./semcore'))).map((packageName) =>
      resolvePath('./semcore', packageName),
    ),
    ...(await fs.readdir(resolvePath('./tools'))).map((packageName) =>
      resolvePath('./tools', packageName),
    ),
  ].filter((path) => !path.endsWith('semcore/ui'));

  const files = (
    await Promise.all(
      packagePaths.map(async (packagePath) => {
        const packageFilePath = resolvePath(packagePath, 'package.json');
        const changelogPath = resolvePath(packagePath, 'CHANGELOG.md');

        if (!(await fs.pathExists(packageFilePath)) || !(await fs.pathExists(changelogPath)))
          return null;

        const packageFile: {
          name: string;
          version: string;
          private?: boolean;
          dependencies: { [dependencyName: string]: string };
        } = await fs.readJson(resolvePath(packagePath, 'package.json'));
        const changelogFile = await fs.readFile(resolvePath(packagePath, 'CHANGELOG.md'), 'utf-8');

        return {
          packageFile,
          changelogFile,
          changelogPath,
          packageFilePath,
          packagePath,
        };
      }),
    )
  ).filter((file) => file !== null);

  const knownPackages = Object.fromEntries(files.map(({ packageFile: { name } }) => [name, true]));

  const packages: Package[] = [];

  for (const { packageFile, changelogFile, changelogPath, packageFilePath, packagePath } of files) {
    const changelogs: Changelog[] = componentChangelogParser(
      packageFile.name,
      changelogFile,
      changelogPath,
    );

    const dependencies: Package['dependencies'] = {};
    for (const dependenciesType of ['dependencies', 'devDependencies']) {
      for (const dependency in packageFile[dependenciesType]) {
        if (!knownPackages[dependency]) continue;

        const version = packageFile[dependenciesType][dependency];
        if (!isValidSemver(version)) {
          throw new Error(
            `Invalid dependency "${dependency}" version "${version}" in ${packageFilePath}`,
          );
        }
        dependencies[dependency] = version;
      }
    }

    packages.push({
      name: packageFile.name,
      path: packagePath,
      isPrivate: packageFile.private || false,
      changelogs,
      currentVersion: packageFile.version,
      lastPublishedVersion: null,
      dependencies,
    });
  }

  const scopes = new Set<string>();

  for (const packageFile of packages) {
    const scope = packageFile.name.startsWith('@') ? packageFile.name.split('/')[0] : null;
    scopes.add(scope);
  }

  if (scopes.size > 1 && [...scopes][0] !== '@semcore') {
    const stringifiedScopes = JSON.stringify([...scopes]);

    throw new Error(
      `Only @semcore packages scope continuous delivery is available for now but got ${stringifiedScopes}. Update \`fetchVersionsFromNpm\` search and this lock`,
    );
  }

  for (const packageFile of packages) {
    const version = inNpmVersions[packageFile.name];
    packageFile.lastPublishedVersion = isValidSemver(version) ? version : null;
  }

  return packages;
};
