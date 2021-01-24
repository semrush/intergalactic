#!/usr/bin/env node
const path = require('path');
const generate = require('../index');

const packagePath = path.resolve(process.cwd(), 'package.json');
let { version } = require(packagePath);

generate(version);
