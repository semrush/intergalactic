import { log } from './utils';
import {
  getReleaseChangelog,
  serializeReleaseChangelog,
  toMarkdown,
} from '@semcore/changelog-handler';
import fs from 'fs/promises';
import { sendMessage, makeMessageFromChangelogs } from '@semcore/slack-integration';
import { execSync } from 'child_process';

export const publishReleaseNotes = async () => {
  log('Publishing release note.');
  log('Authorizing in github...');
  await fs.writeFile('./.gh-auth-token.txt', String(process.env.GITHUB_SECRET));
  execSync('gh auth login --with-token < ./.gh-auth-token.txt', {
    encoding: 'utf-8',
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  await fs.rm('./.gh-auth-token.txt');
  log('Authorized in github.');
  log('Publishing release note...');
  const semcoreUiChangelog = await getReleaseChangelog();
  const version = semcoreUiChangelog.package.version;
  const lastVersionChangelogs = semcoreUiChangelog.changelogs.slice(0, 1);
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
  log('Sending message to internal Slack...');

  const title = `New release v${version} is here!`;
  const body = makeMessageFromChangelogs(lastVersionChangelogs, false);

  await sendMessage({
    title,
    body,
    dryRun: false,
  });
  log('Sent message to internal Slack.');
  log('Release note is published.');
};
