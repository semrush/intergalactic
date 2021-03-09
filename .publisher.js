const selectPackage = require('@semcore/super-publisher/tasks/select-package');
const selectNextVersion = require('@semcore/super-publisher/tasks/select-next-version');
const jest = require('@semcore/super-publisher/tasks/jest');
const build = require('@semcore/super-publisher/tasks/build');
const deploy = require('@semcore/super-publisher/tasks/deploy');
const git = require('@semcore/super-publisher/tasks/git');
const changelog = require('@semcore/super-publisher/tasks/changelog');
const checkChangelog = require('@semcore/super-publisher/tasks/check-changelog.js');
const checkDeps = require('@semcore/super-publisher/tasks/check-deps');
// const showDiff = require('@semcore/super-publisher/tasks/show-diff');
const checkGit = require('@semcore/super-publisher/tasks/check-git');
const npmPublish = require('@semcore/super-publisher/tasks/npm-publish');
const mailer = require('./release/mailer');

module.exports = () => [
  checkGit,
  selectPackage,
  selectNextVersion,
  changelog,
  checkChangelog,
  checkDeps,
  jest,
  build,
  // showDiff,
  git,
  deploy,
  npmPublish,
  mailer,
];
