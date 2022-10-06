import { execSync } from 'child_process';
import { execa } from 'execa';
import { VersionPatch } from './makeVersionPatches';
import Git from 'simple-git';

const git = Git();

export const runPublisher = async (versionPatches: VersionPatch[]) => {
  if (versionPatches.length === 0) return;

  let commitMessage = '[chore] bumped';
  if (versionPatches.length === 1) {
    commitMessage += ` version of `;
  } else {
    commitMessage += `versions of `;
  }
  commitMessage += versionPatches.map((patch) => `${patch.package.name}@${patch.to}`).join(', ');
  const { stdout: gitSignatureUid } = await execa('git', ['config', 'user.signingkey']);
  const { stdout: gitEmail } = await execa('git', ['config', 'user.email']);
  const commitDescription = `<!--- Commit was signed off by ${gitEmail} with GPG key ID ${gitSignatureUid} -->`;
  commitMessage += '\n\n' + commitDescription;
  const pnpmFilter = versionPatches.map((patch) => `--filter ${patch.package.name}`).join(' ');
  const pnpmOptions = process.argv.includes('--dry-run') ? '--dry-run' : '';
  const gitTags = versionPatches.map((patch) => `${patch.package.name}@${patch.to}`);

  await git.add('.');
  if (!process.argv.includes('--dry-run')) {
    await git.commit(commitMessage, []);
    for (const tag of gitTags) {
      await git.tag(['-f', tag]);
    }
  }
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
  if (!process.argv.includes('--dry-run')) {
    await git.pull('origin', 'master', { '--rebase': 'true' });
    await git.push('origin', 'master', { '--follow-tags': 'true' });
  }
};
