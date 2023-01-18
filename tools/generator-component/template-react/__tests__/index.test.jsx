import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, beforeEach} from 'vitest';
import {{ properCase name }} from '../src';

const { render, fireEvent, cleanup } = testing;

describe('{{ properCase name }}', () => {
  beforeEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
