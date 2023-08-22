#!/usr/bin/env tsm

import fs from 'fs/promises';
import pc from 'picocolors';

const commitMessageFilePath = [...process.argv].pop();
const commitMessage = await fs.readFile(commitMessageFilePath, 'utf-8');

const commitTitle = commitMessage.split('\n')[0];

const filterFsEntries = (scopeName: string) =>
  !scopeName.startsWith('.') && !scopeName.startsWith('@');
const semcoreComponents = (await fs.readdir('./semcore')).filter(filterFsEntries);
const toolsComponents = (await fs.readdir('./tools')).filter(filterFsEntries);
const specialScopes = ['global', 'chore', 'ci', 'website', 'docs', 'tests'];
const allowedScopes = [...specialScopes, ...semcoreComponents, ...toolsComponents];

const outputError = (message: string) => {
  // rome-ignore lint/nursery/noConsoleLog:
  console.log(
    `\n${pc.red('Invalid commit message!')} ${message}\nGot commit message: ${pc.gray(
      commitMessage,
    )}\n`,
  );
  process.exit(1);
};

if (!commitMessage) {
  outputError('Message is empty');
}

if (!commitTitle) {
  outputError('First line is empty');
}

if (!commitTitle.startsWith('[') || !commitTitle.includes(']')) {
  outputError(
    `Should be in format "[scope] change description"${pc.gray(
      ', e.g. "[button] added blockchain support"]',
    )}`,
  );
}

if (!commitTitle.includes('] ')) {
  outputError(`Missing in "] " in message of format "[scope${pc.red('] ')}change description" `);
}

const scope = commitTitle.substring(1, commitTitle.indexOf('] '));
const description = commitTitle.substring(commitTitle.indexOf('] ') + 3);

if (!scope) {
  outputError('Got empty scope in message of format "[scope] change description"');
}

if (!description) {
  outputError('Got empty description in message of format "[scope] change description"');
}

const allProvidedScopes = scope.includes(',')
  ? scope.split(',').map((scope) => scope.trim())
  : [scope];
const unknownScope = allProvidedScopes.find((scope) => !allowedScopes.includes(scope));

if (unknownScope) {
  outputError(
    `Got unknown scope "${unknownScope}" in message of format "[scope] change description". Only following scopes are allowed: ${specialScopes
      .map((scope) => pc.cyan(scope))
      .join(', ')}, ${semcoreComponents
      .map((scope) => pc.blue(scope))
      .join(', ')}, ${toolsComponents.map((scope) => pc.magenta(scope)).join(', ')}`,
  );
}
