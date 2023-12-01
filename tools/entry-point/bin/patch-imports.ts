#!/usr/bin/env tsm

import { replaceImports } from '../tools/importUtils';

// biome-ignore lint/suspicious/noConsoleLog:
console.log('start replace old imports');

replaceImports('src').then(() => {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log('Done!');
});
