import React from 'react';
import { render, fireEvent, cleanup } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import {{ properCase name }} from '../src';

describe('{{ properCase name }}', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
