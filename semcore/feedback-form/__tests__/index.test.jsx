import CongratsIllustration from '@semcore/illustration/Congrats';
import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import FeedbackForm, { FeedbackRating } from '../src';

describe('feedback-form Dependency imports', () => {
  runDependencyCheckTests('feedback-form');
});

describe('FeedbackForm', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const feedbackForm = (
      <FeedbackForm onSubmit={() => {}}>
        <FeedbackForm.Notice theme='warning' />
        <FeedbackForm.Item name='input'>
          {({ input }) => <input {...input} />}
        </FeedbackForm.Item>
        <FeedbackForm.Success />
        <FeedbackForm.Cancel />
        <FeedbackForm.Submit />
      </FeedbackForm>
    );

    const { container } = render(feedbackForm);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test.concurrent('Verify call onSubmit', async () => {
    const onSubmit = vi.fn();

    const { getByTestId, unmount } = render(
      <FeedbackForm onSubmit={onSubmit}>
        <FeedbackForm.Item name='input'>{({ input }) => <input {...input} />}</FeedbackForm.Item>
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    await userEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    unmount();
  });

  test.sequential('Verify not call onSubmit for validation error', async () => {
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

    await userEvent.click(getByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(0);
    unmount();
  });

  test('Verify validationOnBlur=true (default behavior)', async () => {
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

  test('Verify validationOnBlur=false', async () => {
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

  test('Verify Escape bubbles from controlled invalid item tooltip', async () => {
    const required = (value) => (value ? undefined : 'Required');
    const onSubmit = vi.fn();
    const onKeyDown = vi.fn();

    const { getByTestId, unmount } = render(
      <FeedbackForm onSubmit={onSubmit} validateOnBlur={false} onKeyDown={onKeyDown}>
        <FeedbackForm.Item
          name='description'
          validate={required}
          tag='input'
          visible
          data-testid='input'
        />
        <FeedbackForm.Submit data-testid='submit'>Send feedback</FeedbackForm.Submit>
      </FeedbackForm>,
    );

    const Input = getByTestId('input');

    await userEvent.click(Input);
    await userEvent.click(getByTestId('submit'));

    expect(Input.getAttribute('aria-invalid')).toBe('true');

    await userEvent.click(Input);
    await userEvent.keyboard('[Escape]');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].key).toBe('Escape');
    unmount();
  });
});

describe('5-star FeedbackForm', () => {
  beforeEach(cleanup);

  test('Verify no submit if invalid', async () => {
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

describe('FeedbackRating - Props and Rendering', () => {
  beforeEach(cleanup);

  const defaultProps = {
    status: 'default',
    notificationVisible: true,
    notificationText: 'Test notification',
    rating: 0,
    visible: false,
    onVisibleChange: vi.fn(),
    onNotificationClose: vi.fn(),
    onSubmit: vi.fn(),
    header: 'Test Header',
    formConfig: [],
    initialValues: { rating: 0 },
    errorFeedbackEmail: 'test@example.com',
  };

  test('Verify data-ui-name', () => {
    const feedbackRating = (
      <FeedbackRating
        {...defaultProps}
        visible
        rating={3}
        formConfig={[
          { key: 'checkbox', label: 'Checkbox option', type: 'checkbox' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ]}
        initialValues={{ rating: 3, checkbox: false, description: '' }}
        header={<FeedbackRating.Header>Feedback header</FeedbackRating.Header>}
      />
    );

    const { container } = render(feedbackRating);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('Should render with default props', () => {
    const { getByText } = render(<FeedbackRating {...defaultProps} />);

    expect(getByText('Test notification')).toBeTruthy();
  });

  test('Should use default Illustration when prop not provided', () => {
    const { container } = render(<FeedbackRating {...defaultProps} />);

    // Verify default illustration is rendered (FeedbackIllustration)
    const illustration = container.querySelector('svg');
    expect(illustration).toBeTruthy();
  });

  test('Should render custom Illustration component', () => {
    const { container } = render(
      <FeedbackRating {...defaultProps} Illustration={CongratsIllustration} />,
    );

    // Verify custom illustration is rendered
    const illustration = container.querySelector('svg');
    expect(illustration).toBeTruthy();
  });

  test('Should call onNotificationClose when close button clicked', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <FeedbackRating {...defaultProps} onNotificationClose={onClose} />,
    );

    const closeButton = container.querySelector('[aria-label="Close notification"]');
    expect(closeButton).toBeTruthy();

    if (closeButton) {
      await userEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  test('Should render notification title when provided', () => {
    const { getByText } = render(
      <FeedbackRating {...defaultProps} notificationTitle='Test Title' />,
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  test('Should render learn more link when provided', () => {
    const { container } = render(
      <FeedbackRating {...defaultProps} learnMoreLink='https://example.com' />,
    );

    const link = container.querySelector('a[href="https://example.com"]');
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain('Learn more');
  });
});

describe('FeedbackRating.validate', () => {
  describe('description validator', () => {
    test('Should require at least 10 characters', () => {
      const validator = FeedbackRating.validate.description('Error: too short');

      expect(validator('ab')).toBe('Error: too short');
      expect(validator('short')).toBe('Error: too short');
    });

    test('Should require at least 3 words', () => {
      const validator = FeedbackRating.validate.description('Error: not enough words');

      expect(validator('hello world')).toBe('Error: not enough words');
      expect(validator('one two')).toBe('Error: not enough words');
    });

    test('Should pass with valid input (10+ chars, 3+ words)', () => {
      const validator = FeedbackRating.validate.description('Error message');

      expect(validator('hello world test')).toBeUndefined(); // 16 chars, 3 words - passes
      expect(validator('this is a valid feedback message')).toBeUndefined(); // 33 chars, 6 words - passes
      expect(validator('one two three four')).toBeUndefined(); // 18 chars, 4 words - passes
    });

    test('Should fail when only one requirement met', () => {
      const validator = FeedbackRating.validate.description('Error message');

      expect(validator('ten chars!')).toBe('Error message'); // 10 chars, 2 words - fails (not enough words)
      expect(validator('a b c')).toBe('Error message'); // 5 chars, 3 words - fails (not enough chars)
    });

    test('Should allow empty value (optional field)', () => {
      const validator = FeedbackRating.validate.description('Error message');

      expect(validator('')).toBeUndefined();
      expect(validator()).toBeUndefined();
    });

    test('Should handle multiple spaces correctly', () => {
      const validator = FeedbackRating.validate.description('Error message');

      // Multiple spaces shouldn't count as words
      expect(validator('one    two    three')).toBeUndefined(); // 3 words, but < 10 actual chars
      expect(validator('hello    world    testing    feedback')).toBeUndefined(); // Valid
    });
  });

  describe('email validator', () => {
    test('Should validate email format', () => {
      const validator = FeedbackRating.validate.email('Invalid email');

      expect(validator('invalid')).toBe('Invalid email');
      expect(validator('test@')).toBe('Invalid email');
      expect(validator('@example.com')).toBe('Invalid email');
      expect(validator('test@example')).toBe('Invalid email');
    });

    test('Should allow empty value (optional field)', () => {
      const validator = FeedbackRating.validate.email('Invalid email');

      expect(validator('')).toBeUndefined();
      expect(validator()).toBeUndefined();
    });

    test('Should be case insensitive', () => {
      const validator = FeedbackRating.validate.email('Invalid email');

      expect(validator('Test@Example.COM')).toBeUndefined();
      expect(validator('USER@DOMAIN.NET')).toBeUndefined();
    });
  });
});
