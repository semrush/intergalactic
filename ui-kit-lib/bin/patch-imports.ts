#!/usr/bin/env tsm

/**
 * Options:
 *   --dry-run
 */
import { replaceImports } from '../tools/importUtils';

console.log('start replace old imports');

await replaceImports();

console.log('Done!');
