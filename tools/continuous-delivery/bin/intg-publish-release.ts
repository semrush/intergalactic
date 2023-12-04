#!/usr/bin/env tsm

/**
 * Options:
 *   --dry-run
 */

import { publishRelease } from '../src/intg-release/publishRelease';

await publishRelease();
