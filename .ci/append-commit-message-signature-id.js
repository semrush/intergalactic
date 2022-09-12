#!/usr/bin/env tsm

/* eslint-disable no-console */

const { execSync } = require('child_process');
const { resolve: resolvePath } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const gitSignatureUid = execSync('git config user.signingkey', {
  encoding: 'utf-8',
}).replace('\n', '');
const gitEmail = execSync('git config user.email', {
  encoding: 'utf-8',
}).replace('\n', '');

const appendix = `<!--- Commit was signed off by ${gitEmail} with GPG key ID ${gitSignatureUid} -->`;

const commitMessageFilePath = resolvePath(__dirname, '..', [...process.argv].pop());
const commitMessage = readFileSync(commitMessageFilePath, 'utf-8');
const lastLine = commitMessage
  .split('\n')
  .filter((line) => line[0] !== '#' && line.replace(/\s+/g, '').length > 0)
  .pop();

if (!lastLine.startsWith('<!--- Commit was signed off by')) {
  const newCommitMessage = commitMessage + '\n\n' + appendix;
  writeFileSync(commitMessageFilePath, newCommitMessage);
}
