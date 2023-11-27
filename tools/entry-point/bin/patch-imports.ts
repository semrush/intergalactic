#!/usr/bin/env tsm

/**
 * Options:
 *   --dry-run
 */
import { replaceImports } from '../tools/importUtils';
// biome-ignore lint/suspicious/noConsoleLog:
console.log('start replace old imports');

await replaceImports();
// biome-ignore lint/suspicious/noConsoleLog:
console.log('Done!');
