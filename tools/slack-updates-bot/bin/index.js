#!/usr/bin/env node
let lastKey = null;
const { urls } = process.argv.slice(2).reduce((acc, key) => {
  if (key.includes('--')) {
    lastKey = key.replace('--', '');
    acc[lastKey] = [];
  } else {
    acc[lastKey] = acc[lastKey] ? [...acc[lastKey], key] : key;
  }
  return acc;
}, {});

const dayjs = require('dayjs');
const sendUiKitUpdates = require('../index');

const DATE_FORMAT = 'YYYY-MM-DD';

const end = dayjs().format(DATE_FORMAT);
const valueMissedDays = dayjs().day() === 5 ? 4 : 7;
const start = dayjs()
  .subtract(valueMissedDays, 'day')
  .format(DATE_FORMAT);

console.log(start, end, valueMissedDays);

sendUiKitUpdates(start, end, urls).catch((err) => console.log(err));
