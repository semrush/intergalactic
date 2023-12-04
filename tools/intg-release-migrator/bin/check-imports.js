#!/usr/bin/env node

const { checkImports } = require('../tools/checkImports');

const baseDir = process.argv[2] || 'src';

// biome-ignore lint/suspicious/noConsoleLog:
console.log('start check old imports in ', baseDir);

checkImports(baseDir);
