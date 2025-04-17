import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import propsForElement from '@semcore/core/lib/utils/propsForElement';
import FeedbackForm, { FeedbackRating } from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('feedback-form Dependency imports', () => {
  runDependencyCheckTests('feedback-form');
});

describe('FeedbackForm', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FeedbackForm);
  shouldSupportRef(FeedbackForm);

  test.concurrent('Should call onSubmit', () => {
    const onSubmit = vi.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='input'>{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test.sequential('Should not call onSubmit for validation error', () => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='input' validate={required}>
          {({ input }) => <input {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test.concurrent('Should correct render form', async ({ task }) => {
    const component = (
      <FeedbackForm>
        <FeedbackForm.Item name='input'>{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit>Send feedback</FeedbackForm.Submit>
        <FeedbackForm.Cancel>Cancel</FeedbackForm.Cancel>
      </FeedbackForm>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correct render notice', async ({ task }) => {
    const component = (
      <FeedbackForm>
        <FeedbackForm.Notice>You can also send us an email.</FeedbackForm.Notice>
        <FeedbackForm.Notice theme='danger'>Your message hasn’t been sent.</FeedbackForm.Notice>
      </FeedbackForm>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correct render feedback success', async ({ task }) => {
    const component = <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correct render spinner', async ({ task }) => {
    const component = (
      <FeedbackForm loading>
        LOADING
        <br />
        LOADING
        <br />
        LOADING
      </FeedbackForm>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correct work props for spinner theme', async ({ task }) => {
    const component = (
      <FeedbackForm loading background='#878dfd85' theme='invert'>
        LOADING
        <br />
        LOADING
        <br />
        LOADING
      </FeedbackForm>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('Should work with validationOnBlur=true (default behavior)', async ({ expect }) => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='description' validate={required}>
          {({ input, meta }) => <input data-testid={'input'} {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    const Input = getByTestId('input');

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    expect(Input.attributes.state.value).toBe('invalid');
  });

  test('Should work with validationOnBlur=false', async ({ expect }) => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit} validateOnBlur={false}>
        <FeedbackForm.Item name='description' validate={required}>
          {({ input, meta }) => <input data-testid={'input'} {...input} />}
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
  });

  test('a11y', async () => {
    const { container } = render(
      <FeedbackForm>
        <label htmlFor='suggestions'>Tell us your suggestion or report an issue</label>
        <FeedbackForm.Item name='input'>
          {({ input }) => <input id='suggestions' {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
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

  test('Should not submit if invalid', async ({ expect }) => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByText } = render(
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
  });
});
