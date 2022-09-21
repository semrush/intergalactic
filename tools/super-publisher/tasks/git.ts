import path from 'path';
import fs from 'fs-extra';
import execa from 'execa';
import Git from 'simple-git';
import { createTask } from '../task';

const git = Git();

export const gitTask = createTask('GIT fixation', async (opt) => {
  opt.progress('processing...');

  const packagePath = path.resolve(opt.root, 'package.json');
  const { version, name } = fs.readJsonSync(packagePath);

  git.cwd(opt.root);

  await git.add(`*`);
  const status = await git.status();

  if (status.files.length) {
    const tag = `${name}_${version}`;

    if (opt.dryRun) {
      opt.log('Not running `git commit -S --no-verify` as far as --dry-run flag passed');
    } else {
      opt.log('Running `git commit -S --no-verify`');
      const { stdout: gitSignatureUid } = await execa('git', ['config', 'user.signingkey']);
      const { stdout: gitEmail } = await execa('git', ['config', 'user.email']);
      const commitDescription = `<!--- Commit was signed off by ${gitEmail} with GPG key ID ${gitSignatureUid} -->`;
      await git.commit(`[${name}] upgrade to ${version}\n\n${commitDescription}`, undefined, {
        '-S': null,
        '--no-verify': null,
      });

      opt.log(`Running \`git pull --rebase\``);
      await git.pull('origin', 'master', { '--rebase': null });

      opt.log(`Running \`git tag -f ${tag}\``);
      await git.tag(['-f', tag]);

      opt.log('Running `git push origin master --no-verify --follow-tags`');
      await git.push('origin', 'master', {
        '--no-verify': null,
        // '--tags': null,
        '--follow-tags': null,
      });
    }
  }

  return opt;
});
