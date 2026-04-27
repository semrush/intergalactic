import { readFile } from 'node:fs/promises';

import { logger } from './utils.ts';

const oldStyles = await readFile('../core/src/theme/themes/light.css', 'utf-8');
const newStyles = await readFile('./lib/light.css', 'utf-8');

const oldSet = new Set();
const newSet = new Set();

oldStyles.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('--')) {
    oldSet.add(trimmed.split(':')[0]);
  }
});

newStyles.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('--')) {
    newSet.add(trimmed.split(':')[0]);
  }
});

logger.log(Array.from(oldSet.difference(newSet).values()).join('\n'));
logger.log(Array.from(newSet.difference(oldSet).values()).join('\n'));
