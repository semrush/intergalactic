import * as React from 'react';
import { testing, snapshot } from '@semcore/cli/tools/jest-preset-ui';
import Badge from '../src';

const { cleanup } = testing;

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
});
