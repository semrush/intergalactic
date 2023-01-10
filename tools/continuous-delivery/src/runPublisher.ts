import { execSync } from 'child_process';
import fs from 'fs/promises';
import { VersionPatch } from './makeVersionPatches';
import Git from 'simple-git';
import dotenv from 'dotenv';
import {
  getReleaseChangelog,
  serializeReleaseChangelog,
  toMarkdown,
} from '@semcore/changelog-handler';
import { sendMessage, makeMessageFromChangelogs } from '@semcore/slack-integration';

dotenv.config();
const git = Git();

export const runPublisher = async (versionPatches: VersionPatch[]) => {
  if (versionPatches.length === 0) return;
  const status = await git.status();

  let commitMessage = '[chore] bumped';
  if (versionPatches.length === 1) {
    commitMessage += ` version of `;
  } else {
    commitMessage += `versions of `;
  }
  commitMessage += versionPatches.map((patch) => `${patch.package.name}@${patch.to}`).join(', ');
  const pnpmOptions = process.argv.includes('--dry-run')
    ? '--dry-run --no-git-checks'
    : '--no-git-checks';
  const gitTags = versionPatches.map((patch) => `${patch.package.name}@${patch.to}`);
  const toPublish = versionPatches.filter((patch) => patch.needPublish);

  const semcoreUiPatch = toPublish.find((patch) => patch.package.name === '@semcore/ui');
  const nonSemcoreUiPatches = toPublish.filter((patch) => patch !== semcoreUiPatch);
  const pnpmFilter = nonSemcoreUiPatches.map((patch) => `--filter ${patch.package.name}`).join(' ');

  if (status.files.length) {
    await git.add('.');
    if (!process.argv.includes('--dry-run')) {
      await git.commit(commitMessage, []);
      for (const tag of gitTags) {
        await git.tag(['-f', tag]);
      }
    }
  }
  if (nonSemcoreUiPatches.length !== 0) {
    execSync(`pnpm ${pnpmFilter} run build`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    if (!process.argv.includes('--dry-run')) {
      execSync(`pnpm ${pnpmFilter} run upload-static`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      execSync(`pnpm ${pnpmFilter} publish ${pnpmOptions}`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
    }
  }
  if (semcoreUiPatch) {
    execSync(`pnpm --filter @semcore/ui run build`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    const status = await git.status();
    if (status.files.length) {
      await git.add('.');
      if (!process.argv.includes('--dry-run')) {
        await git.commit(['[chore] @semcore/ui package version bump'], []);
        await git.tag(['-f', `@semcore/ui@${semcoreUiPatch.to}`]);
      }
    }
    if (!process.argv.includes('--dry-run')) {
      execSync(`pnpm --filter @semcore/ui publish ${pnpmOptions}`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
    }
  }
  if (!process.argv.includes('--dry-run')) {
    await git.pull('origin', 'master', { '--rebase': 'true' });
    await git.push('origin', 'master', { '--follow-tags': null });

    if (semcoreUiPatch) {
      await fs.writeFile('./.gh-auth-token.txt', String(process.env.GITHUB_SECRET));
      execSync(`gh auth login --with-token < ./.gh-auth-token.txt`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      await fs.rm('./.gh-auth-token.txt');
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

      const title = `New release v${version} is here!`;
      const body = makeMessageFromChangelogs(lastVersionChangelogs, false);

      await sendMessage({
        title,
        body,
        dryRun: false,
      });
    }
  }
};
