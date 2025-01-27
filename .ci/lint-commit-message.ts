#!/usr/bin/env tsm

import fs from 'node:fs/promises';
import pc from 'picocolors';
import { allowedScopes } from '../tools/continuous-delivery/src/utils/allowedScopes';

const commitMessageFilePath = [...process.argv].pop();
const commitMessage = await fs.readFile(commitMessageFilePath, 'utf-8');

const commitTitle = commitMessage.split('\n')[0];

const outputError = (message: string) => {
  // biome-ignore lint/suspicious/noConsoleLog:
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
    `Should be in format "[scope] change description" or "[xxxxxxxxx][scope] change description"${pc.gray(
      ', e.g. "[button] added blockchain support"]',
    )}`,
  );
}

if (!commitTitle.includes('] ')) {
  outputError(`Missing in "] " in message of format "[scope${pc.red('] ')}change description" `);
}

let taskId: null | string = null;
let scope: null | string = null;
let description: null | string = null;

if (commitTitle.includes('][')) {
  taskId = commitTitle.substring(1, commitTitle.indexOf(']['));
  scope = commitTitle.substring(
    commitTitle.indexOf('][') + 2,
    commitTitle.indexOf('] ', commitTitle.indexOf('][')),
  );
  description = commitTitle.substring(commitTitle.indexOf('] ', commitTitle.indexOf('][')) + 2);
} else {
  scope = commitTitle.substring(1, commitTitle.indexOf('] '));
  description = commitTitle.substring(commitTitle.indexOf('] ') + 3);
}

if (taskId && (taskId.length < 7 || taskId.length > 9)) {
  outputError(`Got task id "${taskId}" in message while it's expected to be 7-9 characters long`);
}

if (!scope) {
  outputError('Got empty scope in message of format "[scope] change description"');
}

if (!description) {
  outputError('Got empty description in message of format "[scope] change description"');
}

const { specialScopes, semcoreComponents, toolsComponents } = await allowedScopes();
const allAllowedScopes = [...specialScopes, ...semcoreComponents, ...toolsComponents];

const allProvidedScopes = scope.includes(',')
  ? scope.split(',').map((scope) => scope.trim())
  : [scope];
const unknownScope = allProvidedScopes.find((scope) => !allAllowedScopes.includes(scope));

if (unknownScope) {
  outputError(
    `Got unknown scope "${unknownScope}" in message of format "[scope] change description". Only following scopes are allowed: ${specialScopes
      .map((scope) => pc.cyan(scope))
      .join(', ')}, ${semcoreComponents
      .map((scope) => pc.blue(scope))
      .join(', ')}, ${toolsComponents.map((scope) => pc.magenta(scope)).join(', ')}`,
  );
}
