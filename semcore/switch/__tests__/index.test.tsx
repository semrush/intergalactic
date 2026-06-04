import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import Switch, { inputProps } from '../src';

describe('switch Dependency imports', () => {
  runDependencyCheckTests('switch');
});

describe('Switch data-ui-name', () => {
  shouldHaveDataUiName({
    Component: Switch,
    props: { children: <Switch.Value /> },
    expectedDataUiName: 'Switch',
  });

  shouldHaveDataUiName({
    Component: Switch.Addon,
    Wrapper: Switch,
    props: { children: 'Addon' },
    expectedDataUiName: 'Switch.Addon',
  });
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

    await userEvent.click(getByTestId('label').firstElementChild!);
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

    fireEvent.keyDown(getByTestId('value'), { key: 'Enter', keyCode: 13 });
    expect(spy).lastCalledWith(true, expect.any(Object));
  });
});
