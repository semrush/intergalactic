import { selectPackageTask } from './tools/super-publisher/tasks/select-package';
import { selectNextVersionTask } from './tools/super-publisher/tasks/select-next-version';
import { jestTask } from './tools/super-publisher/tasks/jest';
import { buildTask } from './tools/super-publisher/tasks/build';
import { uploadStaticTask } from './tools/super-publisher/tasks/upload-static';
import { gitTask } from './tools/super-publisher/tasks/git';
import { checkChangelogTask } from './tools/super-publisher/tasks/check-changelog';
import { checkDependenciesTask } from './tools/super-publisher/tasks/check-deps';
import { checkGitTask } from './tools/super-publisher/tasks/check-git';
import { checkReleaseTask } from './tools/super-publisher/tasks/check-release';
import { npmPublishTask } from './tools/super-publisher/tasks/npm-publish';
import { mailerTask } from './tools/super-publisher/tasks/mailer';

export const publisherConfigFactory = () => [
  checkGitTask,
  checkReleaseTask,
  selectPackageTask,
  selectNextVersionTask,
  checkChangelogTask,
  checkDependenciesTask,
  jestTask,
  buildTask,
  gitTask,
  uploadStaticTask,
  npmPublishTask,
  mailerTask,
];
