import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render, screen, userEvent } from '@semcore/testing-utils/testing-library';

import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
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
        <Card.Title hintAfter='test'>Title</Card.Title>
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
        <Card.Title hintAfter>Title</Card.Title>
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
          <Card.Title hintAfter={tooltipContent}>Card heading</Card.Title>
          <SettingsM
            style={{ float: 'right' }}
            color='stone'
            interactive
            aria-label='Open settings'
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

  test.sequential('should support keyboard navigation to the Tooltip', async ({ expect }) => {
    const tooltipContent = 'Some tooltip content';

    render(
      <Card>
        <Card.Header>
          <Card.Title hintAfter={tooltipContent} tag='h4' inline my={0}>
            Card heading
          </Card.Title>
        </Card.Header>
      </Card>,
    );

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    const hints = await screen.findAllByText(tooltipContent);

    expect(hints).toHaveLength(1);
  });

  test.concurrent('Renders correctly innerHint', async ({ task }) => {
    const component = (
      <Card>
        <Card.Title innerHint='test'>Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
  test.concurrent('Renders innerHint in a predictable layout', async ({ task }) => {
    const component = (
      <Card>
        <Flex justifyContent='space-between'>
          <Card.Title innerHint='test'>Title</Card.Title>
          Right controls
        </Flex>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
