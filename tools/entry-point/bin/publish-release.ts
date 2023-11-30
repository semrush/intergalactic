#!/usr/bin/env tsm

/**
 * Options:
 *   --dry-run
 */

import { publishRelease } from '../tools/publishRelease';

await publishRelease();
