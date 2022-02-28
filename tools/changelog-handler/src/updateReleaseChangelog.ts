import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { patchReleaseChangelog } from './patchers/patchReleaseChangelog';
import { toMarkdown } from 'marked-ast-markdown';
import { serializeReleaseChangelog } from './serializers/serializeReleaseChangelog';
import execa from 'execa';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '../../../../semcore/ui/');

export const updateReleaseChangelog = async () => {
  const releasePackageFile = await fs.readJson(resolvePath(releasePackageDir, 'package.json'));
  const currentVersion = releasePackageFile.version;
  const patchedReleaseChangelog = await patchReleaseChangelog(currentVersion);
  const changelogMarkdownAst = serializeReleaseChangelog(patchedReleaseChangelog);
  const changelogText = toMarkdown(changelogMarkdownAst);
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  await fs.writeFile(changelogFilePath, changelogText);
  await execa('prettier', ['--write', changelogFilePath]);
};
