#!/usr/bin/env node

const commander = require('commander');
const run = require(`../index`);

commander
  // TODO: брать option из конфига publisher
  .option('--root [root]', 'Path to directory with packages', process.cwd())
  .option('--package [name]', 'Name directory where is the package.json')
  .option('--many', 'Publish some packages')
  .option('--no-check-git', 'No git check')
  .option('--no-select-version', 'No version selection')
  .option('--release [name]', 'Choose next release')
  .option('--changelog [string]', 'Write to changelog')
  .option('--no-check-changelog', 'No check changelog')
  .option('--no-check-deps', 'No check dependency')
  .option('--no-check-release', 'No check release')
  .option('--no-test', 'No run test')
  .parse(process.argv);

run(commander).catch((error) => {
  if (error !== null) {
    console.log(error);
  }

  process.exit(1);
});
