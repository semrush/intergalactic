import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import Switch, { inputProps } from '../src';

describe('switch Dependency imports', () => {
  runDependencyCheckTests('switch');
});

describe('Switch', () => {
  beforeEach(cleanup);

  test('Verify supports onChange callback', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Switch data-testid='label'>
        <Switch.Value onChange={spy} data-testid='value' />
      </Switch>,
    );

    const control = getByTestId('label').firstElementChild;
    if (!(control instanceof HTMLElement)) {
      throw new Error('Expected switch label to contain a control element');
    }

    await userEvent.click(control);
    expect(spy).lastCalledWith(true, expect.any(Object));
  });

  test('Verify supports onChange callback with keyboard', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Switch>
        <Switch.Value
          includeInputProps={['data-testid', ...inputProps]}
          data-testid='value'
          onChange={spy}
        />
      </Switch>,
    );

    getByTestId('value').focus();
    await userEvent.keyboard('[Enter]');
    expect(spy).lastCalledWith(true, expect.any(Object));
  });
});
