import { resolve as resolvePath } from 'path';
import fs from 'fs-extra';
import { componentChangelogParser } from './parsers/componentChangelogParser';
import { fileURLToPath } from 'url';
import { Changelog } from './types';

const filename = fileURLToPath(import.meta.url);

export const collectComponentChangelogs = async () => {
  const packagePaths = [
    ...(await fs.readdir(resolvePath(filename, '../../../../semcore'))).map((packageName) =>
      resolvePath(filename, '../../../../semcore', packageName),
    ),
    ...(await fs.readdir(resolvePath(filename, '../../../../tools'))).map((packageName) =>
      resolvePath(filename, '../../../../tools', packageName),
    ),
  ].filter((path) => !path.endsWith('/semcore/ui'));

  return (
    await Promise.all(
      packagePaths.map(async (packagePath) => {
        const packageFilePath = resolvePath(packagePath, 'package.json');
        const changelogPath = resolvePath(packagePath, 'CHANGELOG.md');

        if (!(await fs.pathExists(packageFilePath)) || !(await fs.pathExists(changelogPath)))
          return null;

        const packageFile: {
          name: string;
          version: string;
        } = await fs.readJson(resolvePath(packagePath, 'package.json'));
        const changelog = await fs.readFile(resolvePath(packagePath, 'CHANGELOG.md'), 'utf-8');

        return {
          package: {
            name: packageFile.name,
            version: packageFile.version,
          },
          changelogs: componentChangelogParser(packageFile.name, changelog, changelogPath),
        };
      }),
    )
  )
    .filter((file) => file !== null)
    .map((file) => file as { package: { name: string; version: string }; changelogs: Changelog[] });
};
