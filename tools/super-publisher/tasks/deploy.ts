import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import { createTask } from '../task';

export const deployTask = createTask('Deploy static', async (opt) => {
  opt.progress('processing...');

  const pkg = fs.readJSONSync(path.resolve(opt.root, 'package.json'));

  if (pkg?.scripts?.deploy) {
    opt.log('Running deploy script');
    if (!opt.dryRun) {
      await execa('yarn', ['deploy'], { cwd: opt.root });
    }
  }

  return opt;
});
