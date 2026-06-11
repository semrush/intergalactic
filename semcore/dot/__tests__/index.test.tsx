import Button from '@semcore/button';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, afterEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Dot from '../src';

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

  test('Verify no "alert" for screenreaders when hidden', async () => {
    const { queryByTestId } = render(
      <Button>
        Button
        <Dot hidden size='m' data-testid='dot' aria-label='Our brand new button!' />
      </Button>,
    );
    expect(queryByTestId('dot')).toBeFalsy();
    expect(document.body.querySelector('div[role="alert"]')).toBeNull();
  });

  test('Verify renders with role "alert" and aria-live "polite" when visible', () => {
    render(<Dot aria-label='alert test'>Content</Dot>);
    const alert = document.body.querySelector('div[role="alert"]');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });
});
