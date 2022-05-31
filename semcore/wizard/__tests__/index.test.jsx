import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Wizard3 from '../src';

const { render, fireEvent, cleanup } = testing;

describe('Wizard3', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
