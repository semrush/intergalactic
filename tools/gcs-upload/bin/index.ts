#!/usr/bin/env tsm

import { upload } from '../index';
import mri from 'mri';

const args = mri(process.argv.slice(2));
const files = args._;

upload(files);
// uploadFilesInFolders(files);
