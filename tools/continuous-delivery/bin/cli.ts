#!/usr/bin/env tsm

/**
 * Options:
 *   --check
 *   --dry-run
 */
import { runContinuousDelivery } from '../index';

await runContinuousDelivery();
