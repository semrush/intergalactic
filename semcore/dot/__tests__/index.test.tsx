import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi, afterEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Dot from '../src';
import Button from '@semcore/button';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('dot Dependency imports', () => {
  runDependencyCheckTests('dot');
});

describe('Dot', () => {
  beforeEach(() => {
    cleanup();
    document.body.innerHTML = '';
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  shouldSupportClassName(Dot, undefined, { 'aria-label': 'test dot' });
  shouldSupportRef(Dot, undefined, { 'aria-label': 'test dot' });

  test('Verify dot does not render Portal when hidden', () => {
    render(<Dot aria-label="alert test" hidden>Content</Dot>);
    expect(document.body.querySelector('div[role="alert"]')).toBeNull();
  });

  test('Verify supports hidden', async () => {
    const { queryByTestId } = render(
      <Button>
        Button
        <Dot hidden size='m' data-testid='dot' aria-label='Our brand new button!' />
      </Button>,
    );
    expect(queryByTestId('dot')).toBeFalsy();
  });

  test('Verify renders Portal alert when not hidden', () => {
    render(<Dot aria-label="alert test">Content</Dot>);
    // Portal should render a div with role alert
    const alert = document.body.querySelector('div[role="alert"]');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  test('Verify logs warning if no aria-label or aria-labelledby', () => {
    render(<Dot />);
    expect(console.warn).toHaveBeenCalledWith(
      "[Dot]: 'aria-label' or 'aria-labelledby' are required for Dot component"
    );
  });

});
