#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('t', {
    alias: 'type',
    type: 'string',
    choices: ['check', 'patch'],
  })
  .option('d', {
    alias: 'baseDir',
    type: 'string',
    description: 'Path to src directory',
  })
  .parse();

const { checkImports } = require('../tools/checkImports');
const { replaceLibsImports } = require('../tools/importUtils');

const baseDir = argv.d || 'src';

if (argv.t === 'check') {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('start check old imports in ', baseDir);

  checkImports(baseDir).then(() => {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('Done!');
  });
} else {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('start replace old imports in ', baseDir);

  replaceLibsImports(baseDir).then(() => {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('Done!');
  });
}
