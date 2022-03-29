#!/usr/bin/env tsm

const dryRun = process.argv.includes('--dry-run');

import dayjs from 'dayjs';
import { broadcastUpdates } from '../index';

const endDate = dayjs().format('YYYY-MM-DD');
const valueMissedDays = dayjs().day() === 5 ? 4 : 7;
const startDate = dayjs().subtract(valueMissedDays, 'day').format('YYYY-MM-DD');

broadcastUpdates({ startDate, endDate, dryRun });
