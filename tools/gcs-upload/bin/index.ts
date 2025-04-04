#!/usr/bin/env tsm

import { upload } from '../index';
import mri from 'mri';

const args = mri(process.argv.slice(2));
const [bucket, ...files] = args._;

upload(bucket, files);
// uploadFilesInFolders(files);
