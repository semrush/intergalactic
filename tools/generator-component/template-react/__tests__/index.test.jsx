import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach} from 'vitest';
import {{ properCase name }} from '../src';

const { render, fireEvent, cleanup } = testing;

describe('{{ properCase name }}', () => {
  afterEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
