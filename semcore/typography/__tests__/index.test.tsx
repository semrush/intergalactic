import * as React from 'react';
import { testing, snapshot } from '@semcore/cli/tools/jest-preset-ui';
import Check from '@semcore/icon/Check/m';
import { Blockquote, List, Text, Hint } from '../src';

const { cleanup, render, axe } = testing;

describe('Text', () => {
  afterEach(cleanup);

  test('Should support size', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support decoration props', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom decoration props', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support align', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support color', async () => {
    const component = (
      <React.Fragment>
        <Text color="blanchedalmond">blanchedalmond</Text>
        <br />
        <Text color="#3eeb4c">#3eeb4c</Text>
        <br />
        <Text color="dark-violet">dark-violet</Text>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support ellipsis`, async () => {
    const component = (
      <Text inline noWrap w={100}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem delectus eligendi et fugit
        numquam quod reiciendis repellat, sequi tempora, ullam unde voluptate. Consectetur
        cupiditate pariatur quaerat temporibus tenetur? Esse, sunt?
      </Text>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support high priority for fontSize compare size`, async () => {
    const component = (
      <Text size={300} fontSize="48px">
        size=300 fontSize=48px
      </Text>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
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
  afterEach(cleanup);

  test('Should support nested', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support custom marker`, async () => {
    const component = (
      <List marker={<Check color="green" />}>
        <List.Item>List item</List.Item>
        <List.Item>List item</List.Item>
      </List>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support custom marker for item`, async () => {
    const component = (
      <List>
        <List.Item marker="-">List item</List.Item>
        <List.Item marker="+">List item</List.Item>
      </List>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
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
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Blockquote>Blockquote</Blockquote>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support author', async () => {
    const component = <Blockquote author="— Mr. Robot">Blockquote</Blockquote>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
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
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Hint>Hint</Hint>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with Addon and Text', async () => {
    const component = (
      <Hint>
        <Hint.Addon>Left</Hint.Addon>
        <Hint.Text>Test</Hint.Text>
        <Hint.Addon>Right</Hint.Addon>
      </Hint>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support active', async () => {
    const component = <Hint active>Hint</Hint>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support disabled', async () => {
    const component = <Hint disabled>Hint</Hint>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support keyboardFocused', async () => {
    const component = <Hint keyboardFocused>Hint</Hint>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Hint>Lorem ipsum dolor</Hint>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
