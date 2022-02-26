import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup } = testing;
import { snapshot } from '@semcore/jest-preset-ui';
import InputTags from '../src';

describe('InputTags', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
