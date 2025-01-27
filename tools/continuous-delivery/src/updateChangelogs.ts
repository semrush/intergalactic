import type { VersionPatch } from './makeVersionPatches';
import { resolve as resolvePath } from 'node:path';
import fs from 'fs-extra';
import {
  type Changelog,
  componentChangelogParser,
  serializeComponentChangelog,
  toMarkdown,
  updateReleaseChangelog,
} from '@semcore/changelog-handler';
import dayjs from 'dayjs';
import { formatMarkdown, log } from './utils';

export const updateChangelogs = async (versionPatches: VersionPatch[]) => {
  log('Updating changelogs...');
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

    const patchedChangelogs = [...componentChangelog];
    for (const changelog of componentChangelog) {
      if (
        changelog.version.replace(/-\w+\.\d+/, '') === packageFile.version.replace(/-\w+\.\d+/, '')
      ) {
        changelog.version = packageFile.version;

        return patchedChangelogs;
      }
    }
    patchedChangelogs.unshift({
      component: packageFile.name,
      version: packageFile.version,
      date: dayjs().format('YYYY-MM-DD'),
      changes: patch.changes,
    });

    return patchedChangelogs;
  });
  await Promise.all(
    patchedChangelogs.map((changelogs, index) =>
      fs.writeFile(
        changelogFilePaths[index],
        formatMarkdown(toMarkdown(serializeComponentChangelog(changelogs))),
      ),
    ),
  );
  log('Changelogs updated.');
};
