import { createTask } from '../task';
import fse from 'fs-extra';
import path from 'path';
import { validateMailerEnv } from '@semcore/mailer';

export const checkReleaseTask = createTask('RELEASE check', async (opt) => {
  if (!opt.checkRelease) {
    opt.skip();
    return opt;
  }
  if (opt.package !== 'ui') {
    opt.log('not a @semcore/ui release');
    opt.skip();
    return opt;
  }

  const releaseChangelogPath = path.resolve(__dirname, '../../../semcore/ui/CHANGELOG.md');
  const releaseChangelog = fse.readFileSync(releaseChangelogPath, 'utf-8');

  if (releaseChangelog.includes('[VERSION]')) {
    throw new Error(`Placeholder [VERSION] detected in ${releaseChangelogPath}`);
  }

  validateMailerEnv();

  return opt;
});
