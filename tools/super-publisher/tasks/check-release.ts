import { createTask } from '../task';
import fse from 'fs-extra';
import path from 'path';
import { validateMailerEnv } from '@semcore/mailer';
import { validateSlackIntegrationEnv } from '@semcore/slack-integration';
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);

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

  const releaseChangelogPath = path.resolve(filename, '../../../../semcore/ui/CHANGELOG.md');
  const releaseChangelog = fse.readFileSync(releaseChangelogPath, 'utf-8');

  if (releaseChangelog.includes('[VERSION]')) {
    throw new Error(`Placeholder [VERSION] detected in ${releaseChangelogPath}`);
  }

  validateSlackIntegrationEnv();
  validateMailerEnv();

  return opt;
});
