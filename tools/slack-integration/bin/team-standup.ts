#!/usr/bin/env tsm

const dryRun = process.argv.includes('--dry-run');

import { notifyTeamAboutStandup } from '../index';

notifyTeamAboutStandup({ dryRun });
