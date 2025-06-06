#!/usr/bin/env tsm

import * as process from 'node:process';

import { getChangedPackages } from '../index';

const base = process.env.BASE;

if (!base) {
  console.error('You must specify the BASE name');
  process.exit(1);
}

// biome-ignore lint/suspicious/noConsoleLog:
console.log(`Compare with "${base}"`);

const list = await getChangedPackages(base);

// biome-ignore lint/suspicious/noConsoleLog:
console.log(list.join(' '));
