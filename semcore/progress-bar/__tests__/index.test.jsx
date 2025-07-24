import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import ProgressBar from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('progress-bar Dependency imports', () => {
  runDependencyCheckTests('progress-bar');
});

describe('ProgressBar', () => {
  beforeEach(cleanup);

  shouldSupportClassName(ProgressBar);
  shouldSupportRef(ProgressBar);

  test.concurrent('Verify supports children', () => {
    const component = (
      <ProgressBar data-testid='parent'>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
      </ProgressBar>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('parent').children.length).toEqual(3);
  });
});
