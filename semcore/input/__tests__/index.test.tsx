import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Input from '../src';

describe('input Dependency imports', () => {
  runDependencyCheckTests('input');
});

describe('Input', () => {
  beforeEach(cleanup);

  test.concurrent('Verify value changes when rerender', () => {
    const { getByTestId, rerender } = render(
      <Input>
        <Input.Value data-testid='value' value='' />
      </Input>,
    );

    expect((getByTestId('value') as HTMLInputElement).value).toBe('');

    rerender(
      <Input>
        <Input.Value data-testid='value' value='test' />
      </Input>,
    );

    expect((getByTestId('value') as HTMLInputElement).value).toBe('test');
  });

  test.sequential('Verify controlled mod', async () => {
    const spy = vi.fn();

    function ControlledInput() {
      const [value, setValue] = React.useState('');

      return (
        <Input>
          <Input.Value
            data-testid='input'
            value={value}
            onChange={(newValue, event) => {
              spy(newValue, event);
              setValue(newValue);
            }}
          />
        </Input>
      );
    }

    const { getByTestId } = render(<ControlledInput />);

    const input = getByTestId('input');

    expect(input).toHaveProperty('value', '');

    await userEvent.type(input, 'test');
    expect(spy).toBeCalled();
    expect(input).toHaveProperty('value', 'test');
  });
});

describe('Input.Addon', () => {
  beforeEach(cleanup);

  test.sequential('Verify input focused if click additional element', async () => {
    const spy = vi.fn();
    const { getByText } = render(
      <Input>
        <Input.Addon>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    expect(spy).toHaveBeenCalledTimes(0);
    await userEvent.pointer({ keys: '[MouseLeft>]', target: getByText('addon') });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test.sequential('Verify input focused of onMouseDown on additional return false', async () => {
    const spy = vi.fn();
    const { getByText } = render(
      <Input>
        <Input.Addon onMouseDown={() => false}>addon</Input.Addon>
        <Input.Value onFocus={spy} />
      </Input>,
    );
    await userEvent.pointer({ keys: '[MouseLeft>]', target: getByText('addon') });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
