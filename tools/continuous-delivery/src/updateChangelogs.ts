import { VersionPatch } from './makeVersionPatches';
import { resolve as resolvePath } from 'path';
import fs from 'fs-extra';
import {
  Changelog,
  componentChangelogParser,
  serializeComponentChangelog,
  toMarkdown,
} from '@semcore/changelog-handler';
import dayjs from 'dayjs';
import { execa } from 'execa';

export const updateChangelogs = async (versionPatches: VersionPatch[]) => {
  const packageFiles: { name: string; version: string }[] = await Promise.all(
    versionPatches.map((patch) => fs.readJson(resolvePath(patch.package.path, 'package.json'))),
  );
  const changelogFilePaths = versionPatches.map((patch) =>
    resolvePath(patch.package.path, 'CHANGELOG.md'),
  );
  const changelogFiles = await Promise.all(
    versionPatches.map((_, index) => fs.readFile(changelogFilePaths[index], 'utf-8')),
  );
  const changelogs = changelogFiles.map((changelogFile, index) =>
    componentChangelogParser(packageFiles[index].name, changelogFile, changelogFilePaths[index]),
  );
  const patchedChangelogs = changelogs.map((componentChangelog, index): Changelog[] => {
    const patch = versionPatches[index];
    const packageFile = packageFiles[index];

    if (componentChangelog.some((changelog) => changelog.version === packageFile.version)) {
      return componentChangelog;
    }

    return [
      {
        component: packageFile.name,
        version: packageFile.version,
        date: dayjs().format('YYYY-MM-DD'),
        changes: patch.changes,
      },
      ...componentChangelog,
    ];
  });
  await Promise.all(
    patchedChangelogs.map((changelogs, index) =>
      fs.writeFile(changelogFilePaths[index], toMarkdown(serializeComponentChangelog(changelogs))),
    ),
  );
  await Promise.all(
    changelogFilePaths.map((changelogPath) => execa('prettier', ['--write', changelogPath])),
  );
};
