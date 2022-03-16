import { selectPackageTask } from './node_modules/@semcore/super-publisher/tasks/select-package';
import { selectNextVersionTask } from './node_modules/@semcore/super-publisher/tasks/select-next-version';
import { gitTask } from './node_modules/@semcore/super-publisher/tasks/git';
import { checkChangelogTask } from './node_modules/@semcore/super-publisher/tasks/check-changelog';
import { checkGitTask } from './node_modules/@semcore/super-publisher/tasks/check-git';
import { npmPublishTask } from './node_modules/@semcore/super-publisher/tasks/npm-publish';

export const publisherConfigFactory = () => [
  checkGitTask,
  selectPackageTask,
  selectNextVersionTask,
  checkChangelogTask,
  gitTask,
  npmPublishTask,
];
