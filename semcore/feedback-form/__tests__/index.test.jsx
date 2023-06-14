import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import propsForElement from '@semcore/utils/lib/propsForElement';
import FeedbackForm from '../src';

const mockSubmitDispatch = () => {
  // https://github.com/capricorn86/happy-dom/issues/527#issuecomment-1174442116
  const originalDispatchEvent = HTMLElement.prototype.dispatchEvent;
  HTMLElement.prototype.dispatchEvent = function (event) {
    const result = originalDispatchEvent.call(this, event);
    if (event.type === 'click' && this.tagName === 'BUTTON' && this.type === 'submit') {
      this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
    return result;
  };

  return () => {
    HTMLElement.prototype.dispatchEvent = originalDispatchEvent;
  };
};

describe('FeedbackForm', () => {
  beforeEach(cleanup);

  shouldSupportClassName(FeedbackForm);
  shouldSupportRef(FeedbackForm);

  test.concurrent('Should call onSubmit', () => {
    const restoreOriginalSubmitDispatch = mockSubmitDispatch();

    const onSubmit = vi.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name="input">{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit data-testid="submit">Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    restoreOriginalSubmitDispatch();
  });

  test.concurrent('Should not call onSubmit for validation error', () => {
    const restoreOriginalSubmitDispatch = mockSubmitDispatch();
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name="input" validate={required}>
          {({ input }) => <input {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid="submit">Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(0);
    restoreOriginalSubmitDispatch();
  });

  test.concurrent('Should correct render form', async ({ task }) => {
    const component = (
      <FeedbackForm>
        <FeedbackForm.Item name="input">{({ input }) => <input {...input} />}</FeedbackForm.Item>
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
        <FeedbackForm.Notice theme="danger">Your message hasn’t been sent.</FeedbackForm.Notice>
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
      <FeedbackForm loading background="#878dfd85" theme="invert">
        LOADING
        <br />
        LOADING
        <br />
        LOADING
      </FeedbackForm>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(
      <FeedbackForm>
        <label htmlFor="suggestions">Tell us your suggestion or report an issue</label>
        <FeedbackForm.Item name="input">
          {({ input }) => <input id="suggestions" {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Submit data-testid="submit">Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe('FeedbackForm.Item', () => {
  beforeEach(cleanup);

  const Item = React.forwardRef((props, ref) => (
    <FeedbackForm.Item interaction="click" {...props}>
      {(props) => <input ref={ref} {...propsForElement(props)} />}
    </FeedbackForm.Item>
  ));

  shouldSupportClassName(Item, FeedbackForm);
  shouldSupportRef(Item, FeedbackForm);
});
