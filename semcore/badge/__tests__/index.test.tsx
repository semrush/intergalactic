import React from 'react';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import { cleanup, render } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import Badge from '../src';

describe('Badge', () => {
  afterEach(cleanup);

  shouldSupportRef(Badge);
  shouldSupportClassName(Badge);

  test('renders correctly', async () => {
    const component = <Badge>admin</Badge>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support color', async () => {
    const component = (
      <>
        <Badge color="white">admin</Badge>
        <Badge color="gray20">alpha</Badge>
        <Badge color="green">new</Badge>
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support bg', async () => {
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
