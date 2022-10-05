import { execa } from 'execa';
import { VersionPatch } from './makeVersionPatches';
import Git from 'simple-git';

const git = Git();
const execaOptions = { stdout: 'inherit', stderr: 'inherit' } as const;

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
  const pnpmFilter = versionPatches.map((patch) => `--filter ${patch.package.name}`);
  const pnpmOptions = process.argv.includes('--dry-run') ? ['--dry-run'] : [];
  const gitTags = versionPatches.map((patch) => `${patch.package.name}@${patch.to}`);

  await git.add('.');
  if (!process.argv.includes('--dry-run')) {
    await git.commit(commitMessage, [], { S: null });
    for (const tag of gitTags) {
      await git.tag(['-f', tag]);
    }
  }
  await execa('pnpm', [...pnpmFilter, 'run', 'test'], execaOptions);
  await execa('pnpm', [...pnpmFilter, 'run', 'upload-static'], execaOptions);
  await execa('pnpm', [...pnpmFilter, 'publish', ...pnpmOptions], execaOptions);
  if (!process.argv.includes('--dry-run')) {
    await git.pull('origin', 'master', { '--rebase': 'true' });
    await git.push('origin', 'master', { '--follow-tags': 'true' });
  }
};
