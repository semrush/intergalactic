import { execSync } from 'child_process';
import fs from 'fs/promises';

import { toMarkdown } from 'marked-ast-markdown';

import { log } from './utils';
import type { ChangelogItem } from './utils/changelog';
import { Changelog } from './utils/changelog';

export const publishReleaseNotes = async (version: string, lastVersionChangelogs: ChangelogItem[]) => {
  log('Publishing release note.');

  log('Authorizing in github...');
  execSync(`echo ${String(process.env.GITHUB_SECRET)} | gh auth login --with-token`, {
    encoding: 'utf-8',
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  log('Authorized in github.');
  log(`Publishing release note for "${version}"...`);
  const releaseNotes = toMarkdown(Changelog.serializeRelease(lastVersionChangelogs))
    .split('\n')
    .slice(2)
    .join('\n');
  await fs.writeFile('./.github-release-notes.txt', releaseNotes);
  execSync(
    `gh release create "${version}" --title "${version}" --notes-file .github-release-notes.txt`,
    {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    },
  );
  await fs.rm('./.github-release-notes.txt');
  log('Published release note.');
};
