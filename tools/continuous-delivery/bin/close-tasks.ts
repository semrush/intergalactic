#!/usr/bin/env tsm

import process from 'process';

import dotenv from 'dotenv';

import { closeTasks } from '../src/intg-release/closeTasks';
import { gitUtils } from '../src/utils/gitUtils';

dotenv.config();

const versionTag = await gitUtils.getCurrentTag();

if (!versionTag) {
  console.error('Unknown version', versionTag);

  process.exit(1);
}

await closeTasks(versionTag);
