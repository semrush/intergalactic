import React from 'react';
import InputMask from '../src';

import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('InputMask', () => {
  beforeEach(cleanup);

  shouldSupportClassName(InputMask);
  shouldSupportRef(InputMask);

  test.concurrent('Should renders correctly', async ({ task }) => {
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
    await expect(await snapshot(<Component value={input.value} />)).toMatchImageSnapshot(task);
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
    expect(input.selectionStart).toBe(4);
    expect(input.selectionEnd).toBe(4);
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

  test('a11y', async () => {
    const { container } = render(
      <>
        <label htmlFor='input_mask'>Expire date</label>
        <InputMask size='l' mb={4}>
          <InputMask.Value
            mask='99 99'
            title='4-digit number'
            placeholder='__ __'
            id='input_mask'
          />
        </InputMask>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('InputMask.Value', () => {
  beforeEach(cleanup);

  shouldSupportClassName(InputMask.Value, InputMask, {
    title: 'test mask',
    includeInputProps: ['data-testid'],
  });
  shouldSupportRef(InputMask.Value, InputMask, { title: 'test mask' });
});
