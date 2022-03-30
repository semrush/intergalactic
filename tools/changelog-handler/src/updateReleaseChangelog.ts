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
  const releasePackageFilePath = resolvePath(releasePackageDir, 'package.json');
  let releasePackageFile = await fs.readJson(releasePackageFilePath);
  const currentVersion = releasePackageFile.version;
  const changelogPatch = await patchReleaseChangelog(currentVersion);
  const { changelogs: patchedReleaseChangelog, version: newVersion } = changelogPatch;
  const changelogMarkdownAst = serializeReleaseChangelog(patchedReleaseChangelog);
  const changelogText = toMarkdown(changelogMarkdownAst);
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  await fs.writeFile(changelogFilePath, changelogText);
  await execa('prettier', ['--write', changelogFilePath]);
  releasePackageFile = await fs.readJson(releasePackageFilePath);
  releasePackageFile.version = newVersion;
  await fs.writeJson(releasePackageFilePath, releasePackageFile, { spaces: 2 });
};
