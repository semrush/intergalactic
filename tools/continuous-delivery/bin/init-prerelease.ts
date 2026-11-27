#!/usr/bin/env tsm

import process from 'process';

/**
 * Options:
 *   --check
 *   --dry-run
 */
import { initPrerelease } from '../index';

const [,, pack] = process.argv;

await initPrerelease(pack);
