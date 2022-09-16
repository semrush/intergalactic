import React from 'react';
import InputMask from '../src';

import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { cleanup, fireEvent, render, axe } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;

describe('InputMask', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputMask);
  shouldSupportRef(InputMask);

  test('Should correct render', async () => {
    const Component = ({ value = '' }) => (
      <InputMask size="l" mb={4}>
        <InputMask.Value
          mask="99 99"
          placeholder="__ __"
          data-testid="input"
          defaultValue={value}
        />
      </InputMask>
    );

    const { getByTestId } = render(<Component />);
    const input = getByTestId('input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '999' } });

    expect(input.value).toBe('99 9');
    expect(await snapshot(<Component value={input.value} />)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <>
        <label htmlFor="input_mask">Expire date</label>
        <InputMask size="l" mb={4}>
          <InputMask.Value
            mask="99 99"
            placeholder="__ __"
            id="input_mask"
            title="4-digit number"
          />
        </InputMask>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('InputMask.Value', () => {
  afterEach(cleanup);

  shouldSupportClassName(InputMask.Value, InputMask);
  shouldSupportRef(InputMask.Value, InputMask);
});
