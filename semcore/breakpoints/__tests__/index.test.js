import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup } = testing;
import { snapshot } from '@semcore/jest-preset-ui';
import Breakpoints from '../src';

describe('Breakpoints', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
