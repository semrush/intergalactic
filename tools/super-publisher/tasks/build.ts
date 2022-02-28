import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import { createTask } from '../task';

export const buildTask = createTask('Building', async (opt) => {
  opt.progress('processing...');

  const pkg = fs.readJsonSync(path.resolve(opt.root, 'package.json'));
  if (pkg?.scripts?.build) {
    await execa('rm', ['-rf', 'lib'], {
      cwd: opt.root,
    });
    await execa('npm', ['run', 'build'], {
      cwd: opt.root,
      env: {
        NODE_ENV: 'production',
      },
    });

    try {
      fs.accessSync(path.join(opt.root, 'lib'));
    } catch (err) {
      throw new Error('lib not found');
    }
  }

  return opt;
});
