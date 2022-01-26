import React from 'react';
import { render, fireEvent, cleanup } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import {{ properCase name }} from '../src';

describe('{{ properCase name }}', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
