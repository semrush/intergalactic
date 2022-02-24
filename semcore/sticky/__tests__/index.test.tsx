import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Sticky from '../src';

describe('Sticky', () => {
  afterEach(cleanup);

  shouldSupportClassName(Sticky);
  shouldSupportRef(Sticky);
});
