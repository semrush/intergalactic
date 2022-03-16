import React from 'react';
import { testing } from '@semcore/cli/tools/jest-preset-ui';
const { render, fireEvent, cleanup } = testing;
import { snapshot } from '@semcore/cli/tools/jest-preset-ui';
import InputTags from '../src';

describe('InputTags', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
