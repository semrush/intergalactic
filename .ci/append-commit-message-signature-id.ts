#!/usr/bin/env tsm

/* eslint-disable no-console */

import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { resolve as resolvePath } from 'path';
import { readFile, writeFile } from 'fs/promises';

const { stdout: gitSignatureUid } = await execa('git', ['config', 'user.signingkey']);
const { stdout: gitEmail } = await execa('git', ['config', 'user.email']);

const appendix = `Commit was signed off by ${gitEmail} with GPG key ID ${gitSignatureUid}`;

const commitMessageFilePath = resolvePath(
  fileURLToPath(import.meta.url),
  '../..',
  [...process.argv].pop(),
);
const commitMessage = await readFile(commitMessageFilePath, 'utf-8');
const lastLine = commitMessage
  .split('\n')
  .filter((line) => line[0] !== '#' && line.replace(/\s+/g, '').length > 0)
  .pop();

if (lastLine && !lastLine.startsWith('Commit was signed off by')) {
  const newCommitMessage = commitMessage + '\n\n' + appendix;
  await writeFile(commitMessageFilePath, newCommitMessage);
}
