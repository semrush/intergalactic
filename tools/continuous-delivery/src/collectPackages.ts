import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import fs from 'fs-extra';
import { isValidSemver, log } from './utils';
import { componentChangelogParser, Changelog } from '@semcore/changelog-handler';
import { fileURLToPath } from 'url';

const dirname = resolveDirname(fileURLToPath(import.meta.url));

export type Package = {
  name: string;
  path: string;
  isPrivate: boolean;
  changelogs: Changelog[];
  currentVersion: string;
  lastPublishedVersion: string | null;
  dependencies: { [dependencyName: string]: string };
};

export const collectPackages = async (inNpmVersions: {
  [packageName: string]: { version: string };
}) => {
  log('Collecting data about local fs packages...');
  const packagePaths = [
    ...(await fs.readdir(resolvePath(dirname, '../../../semcore'))).map((packageName) =>
      resolvePath(dirname, '../../../semcore', packageName),
    ),
    ...(await fs.readdir(resolvePath(dirname, '../../../tools'))).map((packageName) =>
      resolvePath(dirname, '../../../tools', packageName),
    ),
  ];
  const files = (
    await Promise.all(
      packagePaths.map(async (packagePath) => {
        const packageFilePath = resolvePath(packagePath, 'package.json');
        const changelogPath = resolvePath(packagePath, 'CHANGELOG.md');

        if (
          !(await fs.pathExists(packageFilePath)) ||
          !(await fs.pathExists(changelogPath)) ||
          packagePath.endsWith('semcore/table')
        )
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
  )
    .filter((file) => file !== null)
    .map((file) => file!);

  const knownPackages = Object.fromEntries(files.map(({ packageFile: { name } }) => [name, true]));

  const packages: Package[] = [];

  for (const { packageFile, changelogFile, changelogPath, packageFilePath, packagePath } of files) {
    if (packageFile.name === 'intergalactic') continue;
    const changelogs: Changelog[] =
      packageFile.name === '@semcore/ui'
        ? []
        : componentChangelogParser(packageFile.name, changelogFile, changelogPath);

    const dependencies: Package['dependencies'] = {};
    for (const dependenciesType of ['dependencies', 'peerDependencies']) {
      for (const dependency in packageFile[dependenciesType as 'dependencies']) {
        if (!knownPackages[dependency]) continue;

        const version = packageFile[dependenciesType as 'dependencies'][dependency];
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
    if (scope) scopes.add(scope);
  }

  if (scopes.size > 1 && [...scopes][0] !== '@semcore') {
    const stringifiedScopes = JSON.stringify([...scopes]);

    throw new Error(
      `Only @semcore packages scope continuous delivery is available for now but got ${stringifiedScopes}. Update \`fetchVersionsFromNpm\` search and this lock`,
    );
  }

  for (const packageFile of packages) {
    const component = inNpmVersions[packageFile.name];
    if (component) {
      packageFile.lastPublishedVersion = isValidSemver(component.version)
        ? component.version
        : null;
    }
  }

  log(`Collected data about ${packages.length} package(s).`);

  return packages;
};
