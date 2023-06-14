import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

import { Text } from '@semcore/typography';
import SettingsM from '@semcore/icon/Settings/m';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import Card from '../src';

describe('Card', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Card);
  shouldSupportRef(Card);

  shouldSupportClassName(Card.Title, Card);
  shouldSupportRef(Card.Title, Card);

  shouldSupportClassName(Card.Description, Card);
  shouldSupportRef(Card.Description, Card);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Card>Content</Card>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly Tittle/Description', async ({ task }) => {
    const component = (
      <Card>
        <Card.Title hint="test">Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly Tittle/Description without hint', async ({ task }) => {
    const component = (
      <Card>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly Tittle with hint', async ({ task }) => {
    const component = (
      <Card>
        <Card.Title hint>Title</Card.Title>
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly Header and Body', async ({ task }) => {
    const component = (
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>Your awesome card content</Card.Body>
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('basic example visual regression', async ({ task }) => {
    const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;

    const component = (
      <Card>
        <Card.Header>
          <Card.Title hint={tooltipContent}>Card heading</Card.Title>
          <SettingsM
            style={{ float: 'right' }}
            color="stone"
            interactive
            aria-label="Open settings"
          />
          <Card.Description>This is card additional information or insights.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Text size={100}>Your awesome card content ✨</Text>
        </Card.Body>
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
