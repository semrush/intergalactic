import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import { Text } from '@semcore/typography';
import SettingsM from '@semcore/icon/Settings/m';
const { cleanup } = testing;

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
    const component = <Card>Content</Card>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly Tittle/Description', async () => {
    const component = (
      <Card>
        <Card.Title hint="test">Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly Tittle/Description without hint', async () => {
    const component = (
      <Card>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
        Content
      </Card>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly Tittle with hint', async () => {
    const component = (
      <Card>
        <Card.Title hint>Title</Card.Title>
      </Card>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly Header and Body', async () => {
    const component = (
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Body>Your awesome card content</Card.Body>
      </Card>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('basic example visual regression', async () => {
    const tooltipContent = `Hey! Don't forget to place some useful info here 😏`;

    const component = (
      <Card>
        <Card.Header>
          <Card.Title hint={tooltipContent}>Card heading</Card.Title>
          <SettingsM style={{ float: 'right' }} color="stone" interactive />
          <Card.Description>This is card additional information or insights.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Text size={100}>Your awesome card content ✨</Text>
        </Card.Body>
      </Card>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
