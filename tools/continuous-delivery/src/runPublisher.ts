import { execSync } from 'node:child_process';
import type { VersionPatch } from './makeVersionPatches';
import Git from 'simple-git';
import dotenv from 'dotenv';

import { log, prerelaseSuffix } from './utils';
import { publishReleaseNotes } from './publishReleaseNotes';

dotenv.config();
const git = Git();

let alreadyHasCommit = false;
const commitOrAmend = async (message: string) => {
  if (alreadyHasCommit) {
    await git.commit(message, ['--amend', '--no-edit']);
  } else {
    await git.commit(message, []);
    alreadyHasCommit = true;
  }
};

export const runPublisher = async (versionPatches: VersionPatch[]) => {
  log('Running publisher...');
  if (versionPatches.length === 0) {
    log('No versions patches found, stopping.');
    return;
  }
  const status = await git.status();

  let commitMessage = '[chore] bumped';
  if (versionPatches.length === 1) {
    commitMessage += ' version of ';
  } else {
    commitMessage += ' versions of ';
  }
  commitMessage += versionPatches.map((patch) => `${patch.package.name}@${patch.to}`).join(', ');
  let pnpmOptions = process.argv.includes('--dry-run')
    ? '--dry-run --no-git-checks'
    : '--no-git-checks';
  const gitTags = versionPatches.map((patch) => `${patch.package.name}@${patch.to}`);
  const toPublish = versionPatches.filter((patch) => patch.needPublish);

  const semcoreUiPatch = toPublish.find((patch) => patch.package.name === '@semcore/ui');
  const nonSemcoreUiPatches = toPublish.filter((patch) => patch !== semcoreUiPatch);
  const pnpmFilter = nonSemcoreUiPatches.map((patch) => `--filter ${patch.package.name}`).join(' ');

  const prerelease = versionPatches.some((patch) => patch.to.includes(`-${prerelaseSuffix}.`));
  if (prerelease) {
    pnpmOptions += ' --tag beta';
  }

  log(`Commit message "${commitMessage}".`);
  log(`Git tags "${gitTags.join(', ')}".`);
  log(`pnpm filter "${pnpmFilter}".`);
  log(`pnpm options "${pnpmOptions}".`);

  if (status.files.length) {
    log('Committing changes...');
    if (!process.argv.includes('--dry-run')) {
      await git.add('.');
      await commitOrAmend(commitMessage);
      for (const tag of gitTags) {
        await git.tag(['-f', tag]);
      }
    }
    log('Changes committed.');
  }
  if (nonSemcoreUiPatches.length !== 0) {
    log('Building packages...');
    execSync('pnpm build', {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    log('Build finished.');
    if (!process.argv.includes('--dry-run')) {
      log('Uploading static files...');
      execSync(`pnpm ${pnpmFilter} run upload-static`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      log('Static upload done.');
      log('Publishing to registry...');
      execSync(`pnpm ${pnpmFilter} publish ${pnpmOptions}`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      log('Published.');
    }
  }
  if (semcoreUiPatch) {
    log('Building semcore/ui package...');
    execSync('pnpm --filter @semcore/ui run build', {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    log('Building semcore/ui package finished.');
    let status = await git.status();
    if (status.files.length) {
      log('Committing @semcore/ui changes...');
      if (!process.argv.includes('--dry-run')) {
        await git.add('.');
        await commitOrAmend('[chore] @semcore/ui package version bump');
        await git.tag(['-f', `@semcore/ui@${semcoreUiPatch.to}`]);
      }
      log('@semcore/ui changes committed.');
    }
    if (!process.argv.includes('--dry-run')) {
      log('Publishing @semcore/ui...');
      execSync(`pnpm --filter @semcore/ui publish ${pnpmOptions}`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      log('@semcore/ui published.');
    }
    log('Updating lockfile...');
    execSync('pnpm install --frozen-lockfile false', {
      stdio: 'inherit',
    });
    log('Lockfile updated.');
    status = await git.status();
    if (status.files.length) {
      log('Committing lockfile...');
      await git.add('pnpm-lock.yaml');
      if (!process.argv.includes('--dry-run')) {
        await commitOrAmend('[chore] updated lock file');
      }
      log('Lockfile committed.');
    }
  }

  if (!process.argv.includes('--dry-run')) {
    log('Rebasing on git origin...');
    try {
      await git.pull('origin', 'master', { '--rebase': 'true' });
    } catch (err) {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log(await git.status());
      throw err;
    }
    log('Rebased on git origin.');
    log('Pushing to git origin...');
    await git.push('origin', 'master', { '--follow-tags': null });
    log('Pushed to git origin.');
  }
  log('Publisher work is done.');
};
