#!/usr/bin/env tsm

import glob from 'fast-glob';
import { dirname as resolveDirName, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';
// @ts-ignore
// eslint-disable-next-line import/namespace
import { upload } from '../tools/gcs-upload/index';

const __dirname = resolveDirName(fileURLToPath(import.meta.url));

const relativePaths = await glob('**/*', {
  cwd: resolvePath(__dirname, 'dist'),
});
const absolutePaths = relativePaths.map((path) => resolvePath(__dirname, 'dist', path));

if (!process.env.DEPLOYMENT_DIR) {
  throw new Error(`process.env.DEPLOYMENT_DIR should be defined for running website upload`);
}

await upload(absolutePaths, {
  uploadSrcBaseDir: resolvePath(__dirname, 'dist'),
  destinationSubDir: process.env.DEPLOYMENT_DIR,
});
