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

    opt.log('Running `git commit --no-verify`');

    if (!opt.dryRun) {
      await git.commit(`[${name}] upgrade to ${version}`, undefined, {
        '--no-verify': null,
      });
    }

    opt.log(`Running \`git tag -f ${tag}\``);
    if (!opt.dryRun) {
      await git.tag(['-f', tag]);
    }

    opt.log('Running `git push origin master --no-verify --follow-tags`');

    if (!opt.dryRun) {
      await git.push('origin', 'master', {
        '--no-verify': null,
        // '--tags': null,
        '--follow-tags': null,
      });
    }
  }

  return opt;
});
