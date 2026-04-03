import { execSync } from 'child_process';
import fs from 'fs/promises';

import { toMarkdown } from 'marked-ast-markdown';

import { log } from './utils';
import type { ChangelogItem } from './utils/changelog';
import { Changelog } from './utils/changelog';

export const publishReleaseNotes = async (version: string, lastVersionChangelogs: ChangelogItem[]) => {
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
  } catch (error) {
    console.error(error);
  }
};
