#!/usr/bin/env tsm

import { upload } from '../index';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const files = args._;

upload(files);
// uploadFilesInFolders(files);
