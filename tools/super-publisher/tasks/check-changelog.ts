import { createTask } from '../task';
import { validateChangelogs } from '@semcore/changelog-handler';

export const checkChangelogTask = createTask('CHANGELOG.md check', async (opt) => {
  if (!opt.checkChangelog) {
    opt.skip();
    return opt;
  }

  validateChangelogs();

  return opt;
});
