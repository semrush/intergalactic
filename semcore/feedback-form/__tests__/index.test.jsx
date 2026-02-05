import propsForElement from '@semcore/core/lib/utils/propsForElement';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import FeedbackForm, { FeedbackRating } from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('feedback-form Dependency imports', () => {
  runDependencyCheckTests('feedback-form');
});

describe('FeedbackForm', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FeedbackForm);
  shouldSupportRef(FeedbackForm);

  test.concurrent('Verify call onSubmit', () => {
    const onSubmit = vi.fn();

    const { getByTestId, unmount } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='input'>{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    unmount();
  });

  test.sequential('Verify not call onSubmit for validation error', () => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId, unmount } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='input' validate={required}>
          {({ input }) => <input {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(0);
    unmount();
  });

  test('Verify validationOnBlur=true (default behavior)', async ({ expect }) => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId, unmount } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='description' validate={required}>
          {({ input, meta }) => <input data-testid='input' {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    const Input = getByTestId('input');

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    expect(Input.attributes.state.value).toBe('invalid');
    unmount();
  });

  test('Verify validationOnBlur=false', async ({ expect }) => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId, unmount } = render(
      <FeedbackForm onSubmit={onSubmit} validateOnBlur={false}>
        <FeedbackForm.Item name='description' validate={required}>
          {({ input, meta }) => <input data-testid='input' {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    const Input = getByTestId('input');

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    expect(Input.attributes.state.value).toBe('normal');

    await userEvent.keyboard('[Enter]');
    expect(Input.attributes.state.value).toBe('invalid');
    unmount();
  });
});

describe('FeedbackForm.Item', () => {
  beforeEach(cleanup);

  const Item = React.forwardRef((props, ref) => (
    <FeedbackForm.Item interaction='click' {...props}>
      {(props) => <input ref={ref} {...propsForElement(props)} />}
    </FeedbackForm.Item>
  ));

  shouldSupportClassName(Item, FeedbackForm);
  shouldSupportRef(Item, FeedbackForm);
});

describe('5-star FeedbackForm', () => {
  beforeEach(cleanup);

  test('Verify no submit if invalid', async ({ expect }) => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByText, unmount } = render(
      <FeedbackRating
        initialValues={{ input: '' }}
        onSubmit={onSubmit}
        formConfig={[{ key: 'input', label: 'test input', type: 'input', validate: required }]}
        visible
        rating={3}
      />,
    );

    const Input = getByText('test input');

    await userEvent.click(Input);
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    expect(onSubmit).not.toHaveBeenCalled();
    unmount();
  });
});
