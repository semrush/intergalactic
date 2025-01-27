import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';
import { formatMarkdown } from '@semcore/continuous-delivery';
import { serializeReleaseChangelog, patchReleaseChangelog } from '@semcore/changelog-handler';
import { log } from '../utils';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '..', '..', '..', '..', 'entry-point');

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

  if (changelogPatch.changelogs[0].changes.length === 0) {
    return {
      changelogs: [],
      version: null,
    };
  }

  const changelogMarkdownAst = serializeReleaseChangelog(changelogPatch.changelogs);
  const changelogText = formatMarkdown(toMarkdown(changelogMarkdownAst));
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  await fs.writeFile(changelogFilePath, changelogText);

  return changelogPatch;
};
