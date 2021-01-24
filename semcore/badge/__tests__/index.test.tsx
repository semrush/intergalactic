import React from 'react';
import snapshot from 'jest-preset-ui/snapshot';
import { cleanup, render } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import Badge from '../src';

describe('Badge', () => {
  afterEach(cleanup);

  shouldSupportRef(Badge);
  shouldSupportClassName(Badge);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Badge data-testid="badge" name="badge" />);

    expect(getByTestId('badge').attributes['name'].value).toBe('badge');
  });

  test('should support children', () => {
    const component = (
      <Badge data-testid="bage">
        <span data-testid="child">new</span>
      </Badge>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test('should support change tag name', () => {
    const { getByTestId } = render(<Badge data-testid="link" tag="a" />);
    expect(getByTestId('link').tagName).toBe('A');
  });

  test('should support color', async () => {
    const component = (
      <>
        <Badge bg="cyan">admin</Badge>
        <Badge bg="red">alpha</Badge>
        <Badge bg="orange">beta</Badge>
        <Badge bg="green">new</Badge>
        <Badge>soon</Badge>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
