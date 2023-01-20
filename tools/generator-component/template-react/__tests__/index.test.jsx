import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import {  expect, test, describe, beforeEach} from 'vitest';
import {{ properCase name }} from '../src';

import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';

describe('{{ properCase name }}', () => {
  beforeEach(cleanup);

  test('TODO', () => {
    expect(true).toEqual(true);
  });
});
