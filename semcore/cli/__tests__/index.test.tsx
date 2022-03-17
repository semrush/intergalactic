import React from 'react';
import { testing } from '@semcore/cli/tools/jest-preset-ui';

const {
  getOptionsFromArgv,
  getArgvFromObject,
  removeCommandsFromArgv,
} = require('../scripts/utils/getOptions');
const { cleanup } = testing;

describe('Cli utils', () => {
  afterEach(cleanup);

  test('getOptionsFromArgv should work correct', () => {
    expect(getOptionsFromArgv(['--test1', 'open', '--test2', 'close', '.'])).toEqual({
      '--test1': 'open',
      '--test2': 'close',
    });
  });

  test('getArgvFromObject should work correct', () => {
    expect(getArgvFromObject({ '--test1': 'open', '--test2': 'close' })).toEqual(
      '--test1 open --test2 close',
    );
  });

  test('removeCommandsFromArgv should work correct', () => {
    expect(
      removeCommandsFromArgv(['--test1', 'open', '--test2', 'close', '.'], ['--test1', '.']),
    ).toEqual(['--test2', 'close']);
  });
});
