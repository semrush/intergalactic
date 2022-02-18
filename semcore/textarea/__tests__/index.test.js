import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup, fireEvent, render, axe } = testing;

import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import { snapshot } from '@semcore/jest-preset-ui';
import Textarea from '../src';

describe('Textarea', () => {
  afterEach(cleanup);

  shouldSupportClassName(Textarea);
  shouldSupportRef(Textarea);

  test('should support custom attributes on the textarea', () => {
    const { getByTestId } = render(<Textarea data-testid="textarea" name="test" />);

    expect(getByTestId('textarea').attributes['name'].value).toBe('test');
  });

  test('should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Textarea size="xl" />
        <Textarea size="l" />
        <Textarea size="m" />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support focus, valid, inValid, disabled, read-only, resize', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 200 }}>
        <Textarea autoFocus />
        <Textarea state="valid" />
        <Textarea state="invalid" />
        <Textarea disabled />
        <Textarea readOnly />
        <Textarea resize="both" />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should be supported onChange callback', () => {
    const handler = jest.fn();
    const { getByTestId } = render(<Textarea data-testid="textarea" onChange={handler} />);
    const TextareaDom = getByTestId('textarea');
    fireEvent.change(TextareaDom, { target: { value: 'test' } });
    expect(handler.mock.calls).toHaveLength(1);
  });

  test('should support disabled', () => {
    const { queryByTestId } = render(<Textarea data-testid="textarea" disabled />);
    expect(queryByTestId('textarea').attributes['disabled']).toBeTruthy();
  });

  test('should support readOnly', () => {
    const { queryByTestId } = render(<Textarea data-testid="textarea" readOnly />);
    expect(queryByTestId('textarea').attributes['readOnly']).toBeTruthy();
  });

  test('a11y', async () => {
    const { container } = render(<Textarea aria-label="textarea" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
