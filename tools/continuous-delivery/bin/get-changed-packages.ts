#!/usr/bin/env tsm

import { getChangedPackages } from '../index';
import * as process from 'node:process';

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
