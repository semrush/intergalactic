import { selectPackageTask } from './tools/legacy-publisher/tasks/select-package';
import { selectNextVersionTask } from './tools/legacy-publisher/tasks/select-next-version';
import { jestTask } from './tools/legacy-publisher/tasks/jest';
import { buildTask } from './tools/legacy-publisher/tasks/build';
import { uploadStaticTask } from './tools/legacy-publisher/tasks/upload-static';
import { gitTask } from './tools/legacy-publisher/tasks/git';
import { checkChangelogTask } from './tools/legacy-publisher/tasks/check-changelog';
import { checkDependenciesTask } from './tools/legacy-publisher/tasks/check-deps';
import { checkGitTask } from './tools/legacy-publisher/tasks/check-git';
import { checkReleaseTask } from './tools/legacy-publisher/tasks/check-release';
import { npmPublishTask } from './tools/legacy-publisher/tasks/npm-publish';
import { slackBroadcastTask } from './tools/legacy-publisher/tasks/slack-broadcast';
import { mailBroadcastTask } from './tools/legacy-publisher/tasks/mail-broadcast';

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
  slackBroadcastTask,
  mailBroadcastTask,
];
