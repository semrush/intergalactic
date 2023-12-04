#!/usr/bin/env node

const { replaceImports } = require('../tools/importUtils');

const baseDir = process.argv[2] || 'src';

// biome-ignore lint/suspicious/noConsoleLog:
console.log('start replace old imports in ', baseDir);

replaceImports(baseDir).then(() => {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('Done!');
});
