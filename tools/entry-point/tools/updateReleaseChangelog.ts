import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';
import { formatMarkdown } from '@semcore/continuous-delivery';
import { serializeReleaseChangelog, patchReleaseChangelog } from '@semcore/changelog-handler';
import { log } from './logger';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '..', '..');

export const updateReleaseChangelog = async (
  packageJson: Record<string, any>,
  currentDependencies: Record<string, string>,
) => {
  log('Update Release Changelog...');

  const changelogPatch = await patchReleaseChangelog(
    packageJson.version,
    currentDependencies,
    Object.keys(currentDependencies),
  );
  const { changelogs: patchedReleaseChangelog, version: newVersion } = changelogPatch;
  const changelogMarkdownAst = serializeReleaseChangelog(patchedReleaseChangelog);
  const changelogText = formatMarkdown(toMarkdown(changelogMarkdownAst));
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  await fs.writeFile(changelogFilePath, changelogText);

  return changelogPatch;
};
