import path from 'path';
import fs from 'fs-extra';
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
      opt.log('No running git commit, you use --dry-run flag');
    } else {
      opt.log('Running `git commit --no-verify`');

      await git.commit(`[${name}]: upgrade to ${version}`, undefined, {
        '--no-verify': null,
      });

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
