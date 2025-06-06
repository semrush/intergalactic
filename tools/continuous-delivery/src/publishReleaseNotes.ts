import { execSync } from 'child_process';
import fs from 'fs/promises';

import type { Changelog } from '@semcore/changelog-handler';
import { serializeReleaseChangelog, toMarkdown } from '@semcore/changelog-handler';

import { log } from './utils';

export const publishReleaseNotes = async (version: string, lastVersionChangelogs: Changelog[]) => {
  log('Publishing release note.');
  try {
    log('Authorizing in github...');
    await fs.writeFile('./.gh-auth-token.txt', String(process.env.GITHUB_SECRET));
    execSync('gh auth login --with-token < ./.gh-auth-token.txt', {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    await fs.rm('./.gh-auth-token.txt');
    log('Authorized in github.');
    log('Publishing release note...');
    const releaseNotes = toMarkdown(serializeReleaseChangelog(lastVersionChangelogs))
      .split('\n')
      .slice(2)
      .join('\n');
    await fs.writeFile('./.github-release-notes.txt', releaseNotes);
    execSync(
      `gh release create "v${version}" --title "v${version}" --notes-file .github-release-notes.txt`,
      {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      },
    );
    await fs.rm('./.github-release-notes.txt');
    log('Published release note.');
  } catch (error) {
    console.error(error);
  }
};
