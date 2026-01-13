#!/usr/bin/env tsm

import process from 'process';

import dotenv from 'dotenv';

import { publishReleaseNotes } from '../index';
import { Changelog } from '../src/utils/changelog';
import { gitUtils } from '../src/utils/gitUtils';

dotenv.config();

const versionTag = await gitUtils.getCurrentTag();
const version = versionTag?.slice(1);
const releaseChangelog = await Changelog.getRelease();
const lastVersionChangelogs = releaseChangelog.slice(0, 1);

if (!version) {
  console.error('Unknown version', versionTag);

  process.exit(1);
}

await publishReleaseNotes(version, lastVersionChangelogs);
