#!/usr/bin/env tsm

import process from 'process';

import dotenv from 'dotenv';

import { publishReleaseNotes } from '../index';
import { Changelog } from '../src/utils/changelog';
import { gitUtils } from '../src/utils/gitUtils';

dotenv.config();

const versionTag = await gitUtils.getCurrentTag();

if (!versionTag) {
  console.error('Unknown version', versionTag);

  process.exit(1);
}

const releaseChangelog = await Changelog.getRelease(versionTag);

await publishReleaseNotes(versionTag, releaseChangelog);
