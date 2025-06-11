#!/usr/bin/env tsm

/**
 * Options:
 *   --dry-run
 */
import { sendPreReleaseChangelog } from '../index';

await sendPreReleaseChangelog();
