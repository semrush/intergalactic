import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
import Badge from '../src';

const { cleanup, axe, render } = testing;

describe('Badge', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Badge>admin</Badge>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support color', async () => {
    const component = (
      <>
        <Badge color="white">admin</Badge>
        <Badge color="gray20">alpha</Badge>
        <Badge color="green">new</Badge>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support bg', async () => {
    const component = (
      <>
        <Badge bg="cyan">admin</Badge>
        <Badge bg="red">alpha</Badge>
        <Badge bg="orange">beta</Badge>
        <Badge bg="green">new</Badge>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Badge bg="green">new</Badge>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
