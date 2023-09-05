#!/usr/bin/env tsm

/**
 * Options:
 *   --check
 *   --dry-run
 */
import { deliverPrerelease } from '../index';

await deliverPrerelease();
