#!/usr/bin/env tsm

/* eslint-disable no-console */

import fs from 'fs';
import mri from 'mri';
import util from 'util';
import { convertHtml } from '../src/convertHtml';

const readFile = util.promisify(fs.readFile);
const rootDir = process.cwd();
const argv = mri(process.argv.slice(2));
const files = argv._;
const htmlPath = files[0];
const configFile = argv.config;
const values = Object.values(argv);

(async () => {
  if (files.length !== 1 || values.includes(true)) {
    console.log(`
    NAME
    convert-html - convert-html command execution\n
    SYNOPSIS
    convert-html [path-to-html-file] [--config]\n
    DESCRIPTION
    This package convert html to email html with table layout. It takes html file and returns in console converted html file.
    The following options are available:
    --config It is possible to add path to config file for parsing custom tags\n
    EXAMPLES
    Simple usage:\n
    convert-html user/email/index.html\n
    If you want to save converted html in separate file:\n
    convert-html user/email/index.html > user/email/dist/convertedIndex.html\n
    If you want to use your custom tags, you can add path to your config file using flag --config:\n
    convert-html user/email/index.html --config config/customTags.js`);
    process.exit(1);
  }

  const initialHtml = await readFile(htmlPath, 'utf-8');

  let customConfig = {};

  if (configFile && configFile !== true && configFile.includes('.js' || '.ts')) {
    const imported = await import(`${rootDir}/${configFile}`);
    customConfig = imported.default;
  }

  const convertedHtml = await convertHtml(initialHtml, customConfig);

  console.log(convertedHtml);
})();
