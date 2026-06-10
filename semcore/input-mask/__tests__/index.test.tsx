import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import InputMask from '../src';

describe('input-mask Dependency imports', () => {
  runDependencyCheckTests('input-mask');
});

describe('InputMask', () => {
  beforeEach(cleanup);

  test.concurrent('Should renders correctly', async () => {
    const Component = ({ value = '' }) => (
      <InputMask size='l' mb={4}>
        <InputMask.Value
          mask='99 99'
          title='4-digit number'
          placeholder='__ __'
          data-testid='input'
          includeInputProps={['data-testid']}
          defaultValue={value}
        />
      </InputMask>
    );

    const { getByTestId } = render(<Component />);
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '333' } });

    expect(input.value).toBe('33 3');
  });

  test.sequential('should correctly work with `Backspace`', async () => {
    const Component = () => (
      <InputMask size='l' mb={4}>
        <InputMask.Value
          mask='+234 (999)999-999'
          title='4-digit number'
          data-testid='input'
          includeInputProps={['data-testid']}
        />
      </InputMask>
    );

    const { getByTestId } = render(<Component />);
    const input = getByTestId('input') as HTMLInputElement;

    await userEvent.keyboard('[Tab]');

    expect(input).toHaveFocus();

    await userEvent.keyboard('3');
    await userEvent.keyboard('2');
    await userEvent.keyboard('2');

    expect(input.value).toBe('+234 (322');

    await userEvent.keyboard('[Backspace]');
    await userEvent.keyboard('[Backspace]');
    await userEvent.keyboard('[Backspace]');

    expect(input.value).toBe('+234');
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(0);
  });

  test('should not break when initial value is disallowed by pipe', async () => {
    const pipe = (value: any) => {
      if (Number.parseFloat(value) > 5000) return false;
      return value;
    };
    const Component = () => (
      <InputMask size='l' mb={4}>
        <InputMask.Value
          mask='9999'
          value='6000'
          title='4-digit number below 5000'
          data-testid='input'
          pipe={pipe}
          includeInputProps={['data-testid']}
        />
      </InputMask>
    );

    const { getByTestId } = render(<Component />);
    const input = getByTestId('input') as HTMLInputElement;

    expect(input.value).toBe('6000');
  });
});
