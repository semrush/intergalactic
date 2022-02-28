import { resolve as resolvePath } from 'path';
import fs from 'fs-extra';
import { releaseChangelogParser } from './parsers/releaseChangelogParser';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

export const getReleaseChangelog = async () => {
  const packagePath = resolvePath(filename, '../../../../semcore/ui');
  const packageFilePath = resolvePath(packagePath, 'package.json');
  const changelogPath = resolvePath(packagePath, 'CHANGELOG.md');

  if (!(await fs.pathExists(packageFilePath)) || !(await fs.pathExists(changelogPath))) {
    throw new Error(
      `Unable to find package.json or CHANGELOG.md by ${packageFilePath} and ${changelogPath} accordingly`,
    );
  }

  const knownComponents = (
    await Promise.all([
      fs.readdir(resolvePath(filename, '../../../../semcore')),
      fs.readdir(resolvePath(filename, '../../../../tools')),
    ])
  )
    .flat()
    .map((dirname) => `@semcore/${dirname}`);

  const packageFile: {
    name: string;
    version: string;
  } = await fs.readJson(packageFilePath);
  const changelog = await fs.readFile(changelogPath, 'utf-8');

  return {
    package: {
      name: packageFile.name,
      version: packageFile.version,
    },
    changelogs: releaseChangelogParser(changelog, packageFile.name, knownComponents, changelogPath),
  };
};
