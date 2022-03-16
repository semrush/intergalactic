import React from 'react';
import { testing } from '@semcore/cli/tools/jest-preset-ui';
const { cleanup } = testing;

import { snapshot } from '@semcore/cli/tools/jest-preset-ui';
import { shared as testsShared } from '@semcore/cli/tools/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Card from '../src';

describe('Card', () => {
  afterEach(cleanup);

  shouldSupportClassName(Card);
  shouldSupportRef(Card);

  shouldSupportClassName(Card.Title, Card);
  shouldSupportRef(Card.Title, Card);

  shouldSupportClassName(Card.Description, Card);
  shouldSupportRef(Card.Description, Card);

  test('Renders correctly', async () => {
    const Component = <Card>Content</Card>;

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Renders correctly Tittle/Description', async () => {
    const Component = (
      <Card>
        <Card.Title hint="test">Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Renders correctly Tittle/Description without hint', async () => {
    const Component = (
      <Card>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Renders correctly Tittle with hint', async () => {
    const Component = (
      <Card>
        <Card.Title hint>Title</Card.Title>
      </Card>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Renders correctly Header and Body', async () => {
    const Component = (
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>Your awesome card content</Card.Body>
      </Card>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });
});
