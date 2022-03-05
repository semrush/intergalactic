import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import { createTask } from '../task';

export const uploadStaticTask = createTask('Upload static', async (opt) => {
  opt.progress('processing...');

  const pkg = fs.readJSONSync(path.resolve(opt.root, 'package.json'));

  if (pkg?.scripts?.['upload-static']) {
    opt.log('Running upload-static script');
    if (!opt.dryRun) {
      await execa('yarn', ['upload-static'], { cwd: opt.root, stdio: 'inherit' });
    }
  }

  return opt;
});
