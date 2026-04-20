import { test, describe, assertType } from '@semcore/testing-utils/vitest';
import React from 'react';

import { NoticeSmart } from '../src';

describe('NoticeSmart types', () => {
  test('children', () => {
    // @ts-expect-error
    assertType<JSX.Element>(<NoticeSmart children='test' />);
  });
});
