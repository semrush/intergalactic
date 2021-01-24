#!/usr/bin/env node

const [root] = process.argv.slice(2);

const transform = require('../index');
const parsingSvg = require('../parsingSvg');

switch (root) {
  case 'parsing':
    parsingSvg();
    break;
  default:
    transform();
}
