#!/usr/bin/env tsm
/**
 * Git merge driver for CHANGELOG files (replaces removed tools/changelog-handler).
 * Writes the "other" version into the current path — same as `cp %B %A`.
 */
import fs from 'fs/promises';

const pathA = process.argv[2];
const pathB = process.argv[3];

await fs.writeFile(pathA, await fs.readFile(pathB, 'utf8'));
