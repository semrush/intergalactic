import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import InputMask from '../src';

describe('InputMask', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputMask);
  shouldSupportRef(InputMask);
});

describe('InputMask.Value', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputMask.Value, InputMask);
  shouldSupportRef(InputMask.Value, InputMask);
});
