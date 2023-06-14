import React from 'react';
import InputMask from '../src';

import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('InputMask', () => {
  beforeEach(cleanup);

  shouldSupportClassName(InputMask);
  shouldSupportRef(InputMask);

  test.concurrent('Should correct render', async ({ task }) => {
    const Component = ({ value = '' }) => (
      <InputMask size="l" mb={4}>
        <InputMask.Value
          mask="99 99"
          title="4-digit number"
          placeholder="__ __"
          data-testid="input"
          includeInputProps={['data-testid']}
          defaultValue={value}
        />
      </InputMask>
    );

    const { getByTestId } = render(<Component />);
    const input = getByTestId('input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '999' } });

    expect(input.value).toBe('99 9');
    await expect(await snapshot(<Component value={input.value} />)).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <>
        <label htmlFor="input_mask">Expire date</label>
        <InputMask size="l" mb={4}>
          <InputMask.Value
            mask="99 99"
            title="4-digit number"
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
  beforeEach(cleanup);

  shouldSupportClassName(InputMask.Value, InputMask, {
    title: 'test mask',
    includeInputProps: ['data-testid'],
  });
  shouldSupportRef(InputMask.Value, InputMask, { title: 'test mask' });
});
