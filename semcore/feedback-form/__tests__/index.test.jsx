import React from 'react';
import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup, axe } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;

import propsForElement from '@semcore/utils/lib/propsForElement';
import FeedbackForm from '../src';

describe('FeedbackForm', () => {
  afterEach(cleanup);

  shouldSupportClassName(FeedbackForm);
  shouldSupportRef(FeedbackForm);

  test('Should call onSubmit', () => {
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name="input">{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit data-testid="submit">Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    fireEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('Should not call onSubmit for validation error', () => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = jest.fn();

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
  });

  test('Should correct render form', async () => {
    const component = (
      <FeedbackForm>
        <FeedbackForm.Item name="input">{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit>Send feedback</FeedbackForm.Submit>
        <FeedbackForm.Cancel>Cancel</FeedbackForm.Cancel>
      </FeedbackForm>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should correct render notice', async () => {
    const component = (
      <FeedbackForm>
        <FeedbackForm.Notice>You can also send us an email.</FeedbackForm.Notice>
        <FeedbackForm.Notice theme="danger">Your message hasn’t been sent.</FeedbackForm.Notice>
      </FeedbackForm>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should correct render feedback success', async () => {
    const component = <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should correct render spinner', async () => {
    const component = (
      <FeedbackForm loading>
        LOADING
        <br/>
        LOADING
        <br/>
        LOADING
      </FeedbackForm>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should correct work props for spinner theme', async () => {
    const component = (
      <FeedbackForm loading background='#878dfd85' theme='invert'>
        LOADING
        <br/>
        LOADING
        <br/>
        LOADING
      </FeedbackForm>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
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
  afterEach(cleanup);

  const Item = React.forwardRef((props, ref) => (
    <FeedbackForm.Item {...props}>
      {(props) => <input ref={ref} {...propsForElement(props)} />}
    </FeedbackForm.Item>
  ));

  shouldSupportClassName(Item, FeedbackForm);
  shouldSupportRef(Item, FeedbackForm);
});
