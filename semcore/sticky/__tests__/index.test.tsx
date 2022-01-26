import React from 'react';
import { cleanup } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import Sticky from '../src';

describe('Sticky', () => {
  afterEach(cleanup);

  shouldSupportClassName(Sticky);
  shouldSupportRef(Sticky);
});
