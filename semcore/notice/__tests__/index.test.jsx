import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Notice, { NoticeSmart } from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('notice Dependency imports', () => {
  runDependencyCheckTests('notice');
});

describe('Notice', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Notice);
  shouldSupportRef(Notice);

  test.concurrent('Verify supports custom attributes', () => {
    const { getByTestId } = render(<Notice data-testid='notice' name='notice' />);
    expect(getByTestId('notice').attributes['name'].value).toBe('notice');
  });

  test.concurrent('Verify supports children', () => {
    const component = (
      <Notice>
        <p data-testid='child'>Test</p>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test.concurrent('Verify supports custom close icon', () => {
    const component = (
      <Notice>
        <Notice.Close data-testid='close'>Close Icon</Notice.Close>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });
});

describe('NoticeSmart', () => {
  shouldSupportClassName(NoticeSmart);
  shouldSupportRef(NoticeSmart);
});
