import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Check from '@semcore/icon/Check/m';
import Question from '@semcore/icon/Question/m';
import { Blockquote, List, Text, Hint } from '../src';

import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Text', () => {
  beforeEach(cleanup);

  test.concurrent('Should support size', async ({ task }) => {
    const component = (
      <React.Fragment>
        <Text size={800}>800</Text>
        <br />
        <Text size={700}>700</Text>
        <br />
        <Text size={600}>600</Text>
        <br />
        <Text size={500}>500</Text>
        <br />
        <Text size={400}>400</Text>
        <br />
        <Text size={300}>300</Text>
        <br />
        <Text size={200}>200</Text>
        <br />
        <Text size={100}>100</Text>
      </React.Fragment>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support decoration props', async ({ task }) => {
    const component = (
      <React.Fragment>
        <Text bold>bold</Text>
        <br />
        <Text medium>medium</Text>
        <br />
        <Text italic>italic</Text>
        <br />
        <Text underline>underline</Text>
        <br />
        <Text lineThrough>lineThrough</Text>
      </React.Fragment>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom decoration props', async ({ task }) => {
    const component = (
      <React.Fragment>
        <Text fontSize="10px">fontSize=10px</Text>
        <Text fontSize="20px"> fontSize=20px</Text>
        <br />
        <Text style={{ verticalAlign: 'top' }} lineHeight="10px">
          lineHeight=10px
        </Text>
        <Text style={{ verticalAlign: 'top' }} lineHeight="40px">
          lineHeight=40px
        </Text>
        <br />
        <Text fontWeight={100}>fontWeight=100</Text>
        <Text fontWeight={900}> fontWeight=900</Text>
      </React.Fragment>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support align', async ({ task }) => {
    const component = (
      <React.Fragment>
        <div style={{ width: 200 }}>
          <Text textAlign="left">left left left left left left</Text>
        </div>
        <div style={{ width: 200 }}>
          <Text w={200} inline textAlign="center">
            center center center center center center{' '}
          </Text>
        </div>
        <div style={{ width: 200 }}>
          <Text w={200} inline textAlign="right">
            right right right right right right{' '}
          </Text>
        </div>
      </React.Fragment>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support color', async ({ task }) => {
    const component = (
      <React.Fragment>
        <Text color="blanchedalmond">blanchedalmond</Text>
        <br />
        <Text color="#3eeb4c">#3eeb4c</Text>
        <br />
        <Text color="dark-violet">dark-violet</Text>
      </React.Fragment>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test(`Should support ellipsis`, async ({ task }) => {
    const component = (
      <Text inline noWrap w={100}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem delectus eligendi et fugit
        numquam quod reiciendis repellat, sequi tempora, ullam unde voluptate. Consectetur
        cupiditate pariatur quaerat temporibus tenetur? Esse, sunt?
      </Text>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test(`Should support high priority for fontSize compare size`, async ({ task }) => {
    const component = (
      <Text size={300} fontSize="48px">
        size=300 fontSize=48px
      </Text>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <>
        <Text tag="h1">H1</Text>
        <Text tag="h2">H2</Text>
        <Text tag="h3">H3</Text>
        <Text tag="h4">H4</Text>
        <Text tag="h5">H5</Text>
        <Text tag="h6">H6</Text>
        <Text tag="small">
          But I do love the taste of a <Text tag="strong">good burger</Text>. Mm-mm-mm.
        </Text>
        <Text tag="p">
          But I do love the taste of a <Text tag="s">good burger</Text>. Mm-mm-mm.
        </Text>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('List', () => {
  beforeEach(cleanup);

  test.concurrent('Should support nested', async ({ task }) => {
    const component = (
      <List size={100}>
        <List.Item>List item</List.Item>
        <List.Item>List item</List.Item>
        <List.Item>
          List item
          <List>
            <List.Item>List item</List.Item>
            <List.Item>
              List item
              <List>
                <List.Item>List item</List.Item>
                <List.Item>List item</List.Item>
                <List.Item>List item</List.Item>
              </List>
            </List.Item>
            <List.Item>List item</List.Item>
          </List>
        </List.Item>
      </List>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test(`Should support custom marker`, async ({ task }) => {
    const component = (
      <List marker={<Check color="green" />}>
        <List.Item>List item</List.Item>
        <List.Item>List item</List.Item>
      </List>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test(`Should support custom marker for item`, async ({ task }) => {
    const component = (
      <List>
        <List.Item marker="-">List item</List.Item>
        <List.Item marker="+">List item</List.Item>
      </List>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <>
        <List mb={2}>
          <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
          <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
        </List>
        <List tag="ol">
          <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
          <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
        </List>
      </>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Blockquote', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Blockquote>Blockquote</Blockquote>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support author', async ({ task }) => {
    const component = <Blockquote author="— Mr. Robot">Blockquote</Blockquote>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <Blockquote author="Author Author">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod
        tincidunt ut lacreet dolore magna aliguam erat volutpat. Ut wisis enim ad minim veniam, quis
        nostrud exerci tution ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      </Blockquote>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Hint', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Hint>Hint</Hint>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon and Text', async ({ task }) => {
    const component = (
      <Hint>
        <Hint.Addon>
          <Question />
        </Hint.Addon>
        <Hint.Text>Test</Hint.Text>
        <Hint.Addon>
          <Question />
        </Hint.Addon>
      </Hint>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with alternative api Addon and Text', async ({ task }) => {
    const component = (
      <Hint addonLeft={Question} addonRight={Question}>
        Test
      </Hint>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = (
      <>
        <Hint active>Hint</Hint> <Hint id="hint">Hint</Hint>
      </>
    );

    await expect(
      await snapshot(component, {
        actions: {
          active: '#hint',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover', async ({ task }) => {
    const component = <Hint id="hint">Hint</Hint>;

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#hint',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled', async ({ task }) => {
    const component = <Hint disabled>Hint</Hint>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support keyboardFocused', async ({ task }) => {
    const component = <Hint keyboardFocused>Hint</Hint>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(<Hint>Lorem ipsum dolor</Hint>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
