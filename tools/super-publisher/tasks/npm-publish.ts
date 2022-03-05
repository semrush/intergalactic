import path from 'path';
import execa from 'execa';
import semver from 'semver';
import fs from 'fs-extra';
import { createTask } from '../task';

export const npmPublishTask = createTask('NPM publishing', async (opt) => {
  opt.progress('processing...');

  const packagePath = path.resolve(opt.root, 'package.json');

  const { version } = fs.readJsonSync(packagePath);

  const tag = semver.prerelease(version) ? 'beta' : 'latest';

  try {
    const npmArgs = [
      'publish',
      opt.root,
      '--tag',
      tag,
      '--access',
      'public',
      '--registry',
      'https://registry.npmjs.org',
    ];

    opt.log(`Running \`npm ${npmArgs.join(' ')}\``);

    if (!opt.dryRun) {
      await execa('npm', npmArgs, {
        stdio: 'inherit',
      });
    }
  } catch (e) {
    throw new Error(e.message);
  }

  return opt;
});
