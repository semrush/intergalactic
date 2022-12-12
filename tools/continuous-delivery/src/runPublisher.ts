import { execSync } from 'child_process';
import { VersionPatch } from './makeVersionPatches';
import Git from 'simple-git';

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
  const pnpmOptions = process.argv.includes('--dry-run') ? '--dry-run' : '';
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
    execSync(`pnpm ${pnpmFilter} run upload-static`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    execSync(`pnpm ${pnpmFilter} publish ${pnpmOptions}`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
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
        await git.commit(['[ui] package version bump'], []);
        await git.tag(['-f', `@semcore/ui@${semcoreUiPatch.to}`]);
      }
    }
    execSync(`pnpm --filter @semcore/ui publish ${pnpmOptions}`, {
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
  }
  if (!process.argv.includes('--dry-run')) {
    await git.pull('origin', 'master', { '--rebase': 'true' });
    await git.push('origin', 'master', { '--follow-tags': null });

    if (semcoreUiPatch) {
      execSync(`bash -e ./tools/continuous-delivery/src/gh-release`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
    }
  }
};
