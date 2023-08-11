import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';
import { serializeReleaseChangelog } from './serializers/serializeReleaseChangelog';
import { fetchFromNpm, formatMarkdown } from '@semcore/continuous-delivery';
import { getReleaseChangelog } from './getReleaseChangelog';

const filename = fileURLToPath(import.meta.url);
const releasePackageDir = resolvePath(filename, '../../../../semcore/ui/');

export const removeBetaVersionFromReleaseChangelog = async () => {
  const releaseChangelog = await getReleaseChangelog();
  const patchedChangelogs = releaseChangelog.changelogs.map((changelog) => {
    if (changelog.version.includes('-')) {
      return { ...changelog, version: changelog.version.split('-')[0] };
    }
    return changelog;
  });
  const changelogMarkdownAst = serializeReleaseChangelog(patchedChangelogs);
  const changelogText = formatMarkdown(toMarkdown(changelogMarkdownAst));
  const changelogFilePath = resolvePath(releasePackageDir, 'CHANGELOG.md');
  await fs.writeFile(changelogFilePath, changelogText);
};
