#!/usr/bin/env tsm

import semver from 'semver';
import commander from 'commander';
import { runPublisherTasks } from '../index';
import { TaskArgs } from '../task';

export type PublisherOptions = Partial<{
  root: string;
  package: string;
  many: boolean;
  checkGit: boolean;
  selectVersion: boolean;
  release: semver.ReleaseType | 'current';
  checkChangelog: boolean;
  checkDeps: boolean;
  checkRelease: boolean;
  test: boolean;
  dryRun: boolean;
  tasks: string;
}>;

const options = commander
  .option('--root [root]', 'Path to directory with packages', process.cwd())
  .option('--package [name]', 'Name directory where is the package.json')
  .option('--many', 'Publish some packages')
  .option('--no-check-git', 'No git check')
  .option('--no-select-version', 'No version selection')
  .option(
    '--release [name]',
    'Choose next release (current|prepatch|preminor|premajor|patch|minor|major)',
  )
  .option('--no-check-changelog', 'No check changelog')
  .option('--no-check-deps', 'No check dependency')
  .option('--no-check-release', 'No check release')
  .option('--no-test', 'No run test')
  .option('--dry-run', 'No upload-static, no commit, no publish, no mail')
  .option('--tasks [tasks]', 'Path to file config tasks')
  .parse(process.argv)
  .opts() as TaskArgs;

options.rawArgs = process.argv;

runPublisherTasks(options).catch((error) => {
  if (error !== null) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  process.exit(1);
});
