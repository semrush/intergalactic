#!/usr/bin/env node
const { url } = require('minimist')(process.argv.slice(2));
const dayjs = require('dayjs');
const sendUiKitUpdates = require('../index');

const DATE_FORMAT = 'YYYY-MM-DD';

const end = dayjs().format(DATE_FORMAT);
const start = dayjs()
  .subtract(7, 'day')
  .format(DATE_FORMAT);

sendUiKitUpdates(start, end, url).catch((err) => console.log(err));
