#!/usr/bin/env tsm

import mri from 'mri';

import { upload } from '../index';

const args = mri(process.argv.slice(2));
const [bucket, ...files] = args._;

upload(bucket, files);
// uploadFilesInFolders(files);
