#!/usr/bin/env tsm

let lastFlag: string | null = null;
const { endpoints } = process.argv.slice(2).reduce((acc, flag) => {
  if (flag.includes('--')) {
    lastFlag = flag.substring('--'.length);
    acc[lastFlag] = [];
  } else if (lastFlag) {
    acc[lastFlag] = [...acc[lastFlag], flag];
  }
  return acc;
}, {} as { [flagName: string]: string[] });
const dryRun = process.argv.includes('--dry-run');

import dayjs from 'dayjs';
import { sendUiKitUpdates } from '../index';

const endDate = dayjs().format('YYYY-MM-DD');
const valueMissedDays = dayjs().day() === 5 ? 4 : 7;
const startDate = dayjs().subtract(valueMissedDays, 'day').format('YYYY-MM-DD');

sendUiKitUpdates({ startDate, endDate, endpoints, dryRun });
