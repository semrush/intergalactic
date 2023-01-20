import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';

import Badge from '../src';

import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Badge', () => {
  beforeEach(cleanup);

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
