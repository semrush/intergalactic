import { resolve as resolvePath } from 'node:path';
import fs from 'fs-extra';
import {
  collectComponentChangelogs,
  componentChangelogParser,
  serializeComponentChangelog,
  toMarkdown,
} from '@semcore/changelog-handler';
import { formatMarkdown } from './utils';

export const formatChangelogs = async () => {
  const packages = await collectComponentChangelogs();
  const packageFiles: { name: string; version: string }[] = await Promise.all(
    packages.map(({ path }) => fs.readJson(resolvePath(path, 'package.json'))),
  );
  const changelogFilePaths = packages.map(({ path }) => resolvePath(path, 'CHANGELOG.md'));
  const changelogFiles = await Promise.all(
    packages.map((_, index) => fs.readFile(changelogFilePaths[index], 'utf-8')),
  );
  const changelogs = changelogFiles.map((changelogFile, index) =>
    componentChangelogParser(packageFiles[index].name, changelogFile, changelogFilePaths[index]),
  );
  await Promise.all(
    changelogs.map((changelogs, index) =>
      fs.writeFile(
        changelogFilePaths[index],
        formatMarkdown(toMarkdown(serializeComponentChangelog(changelogs))),
      ),
    ),
  );
};
