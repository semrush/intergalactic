import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { render, cleanup, axe } = testing;
import { snapshot } from '@semcore/jest-preset-ui';
import Notice, { NoticeSmart } from '../src';
import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;

describe('Notice', () => {
  afterEach(cleanup);

  shouldSupportClassName(Notice);
  shouldSupportRef(Notice);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Notice data-testid="notice" name="notice" />);
    expect(getByTestId('notice').attributes['name'].value).toBe('notice');
  });

  test('should support children', () => {
    const component = (
      <Notice>
        <p data-testid="child">Test</p>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test('should support custom close icon', () => {
    const component = (
      <Notice>
        <Notice.CloseIcon data-testid="close">Close Icon</Notice.CloseIcon>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test('should support theme props', async () => {
    const component = (
      <>
        <Notice>Text Notice</Notice>
        <br />
        <Notice theme="success">Text Notice</Notice>
        <br />
        <Notice theme="danger">Text Notice</Notice>
        <br />
        <Notice theme="warning">Text Notice</Notice>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('NoticeSmart', () => {
  shouldSupportRef(NoticeSmart);

  test('should support theme props', async () => {
    const component = (
      <>
        <NoticeSmart>Text NoticeSmart</NoticeSmart>
        <br />
        <NoticeSmart theme="success">Text NoticeSmart</NoticeSmart>
        <br />
        <NoticeSmart theme="danger">Text NoticeSmart</NoticeSmart>
        <br />
        <NoticeSmart theme="warning">Text NoticeSmart</NoticeSmart>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <NoticeSmart label="label" actions="actions" closable>
        Text NoticeSmart
      </NoticeSmart>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
