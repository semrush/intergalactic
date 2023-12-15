#!/usr/bin/env tsm

/**
 * Options:
 *   --dry-run
 */
import { publishPreRelease } from '../src/intg-release/publishPreRelease';

await publishPreRelease();
