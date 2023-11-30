#!/usr/bin/env node

const { replaceImports } = require('./index');

// biome-ignore lint/suspicious/noConsoleLog:
console.log('start replace old imports');

replaceImports('src').then(() => {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('Done!');
});
