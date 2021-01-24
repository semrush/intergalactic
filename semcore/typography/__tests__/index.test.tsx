import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import CheckXS from '@semcore/icon/lib/Check/xs';
import CheckS from '@semcore/icon/lib/Check/s';
import { Blockquote, List, Text, Hint } from '../src';
import snapshot from 'jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';

describe('Typography', () => {
  afterEach(cleanup);
  test('View Headings', async () => {
    const component = (
      <React.Fragment>
        <Text size={800} bold tag="h1">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
        <Text size={700} bold tag="h2">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
        <Text size={600} tag="h3">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
        <Text size={500} tag="h4">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
        <Text size={400} tag="h5">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
        <Text size={300} tag="h6">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
        <Text size={200} bold tag="h6">
          Headings{' '}
          <Text tag="small" color="gray60" fontWeight={300}>
            2-20(89)
          </Text>
        </Text>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support ellipsis prop`, async () => {
    const component = (
      <Text inline noWrap w={100}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem delectus eligendi et fugit
        numquam quod reiciendis repellat, sequi tempora, ullam unde voluptate. Consectetur
        cupiditate pariatur quaerat temporibus tenetur? Esse, sunt?
      </Text>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support ellipsis prop for List`, async () => {
    const component = (
      <List w={100}>
        <List.Item noWrap>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem delectus eligendi et fugit
          numquam quod reiciendis repellat, sequi tempora, ullam unde voluptate. Consectetur
          cupiditate pariatur quaerat temporibus tenetur? Esse, sunt?
        </List.Item>
      </List>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support P size`, async () => {
    const component = (
      <React.Fragment>
        <Text size={300} tag="p">
          Test size P 300
        </Text>
        <Text size={200} tag="p">
          Test size P 200
        </Text>
        <Text size={100} tag="p">
          Test size P 100
        </Text>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support hight priority for fontSize compare size`, async () => {
    const component = (
      <Text size={300} fontSize="48px">
        Test size 48px
      </Text>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support Ul size`, async () => {
    const component = (
      <React.Fragment>
        <List size={300}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
        <List size={200}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
        <List size={100}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Support nested list Ul', async () => {
    const component = (
      <List size={100}>
        <List.Item>Test text</List.Item>
        <List.Item>Test text</List.Item>
        <List.Item>
          Test text
          <List>
            <List.Item>Test text</List.Item>
            <List.Item>Test text</List.Item>
            <List.Item>Test text</List.Item>
          </List>
        </List.Item>
      </List>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support Ol size`, async () => {
    const component = (
      <React.Fragment>
        <List size={300}>
          <List.Item marker={1}>Test size Ul</List.Item>
          <List.Item marker={2}>Test size Ul</List.Item>
          <List.Item marker={3}>Test size Ul</List.Item>
        </List>
        <List size={200}>
          <List.Item marker={1}>Test size Ul</List.Item>
          <List.Item marker={2}>Test size Ul</List.Item>
          <List.Item marker={3}>Test size Ul</List.Item>
        </List>
        <List size={100}>
          <List.Item marker={1}>Test size Ul</List.Item>
          <List.Item marker={2}>Test size Ul</List.Item>
          <List.Item marker={3}>Test size Ul</List.Item>
        </List>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Support nested list Ol', async () => {
    const component = (
      <List size={100}>
        <List.Item marker={1}>Test text</List.Item>
        <List.Item marker={2}>Test text</List.Item>
        <List.Item marker={3}>
          Test text
          <List>
            <List.Item marker={3.1}>Test text</List.Item>
            <List.Item marker={3.2}>Test text</List.Item>
            <List.Item marker={3.3}>Test text</List.Item>
          </List>
        </List.Item>
      </List>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test(`Should support CheckList size`, async () => {
    const component = (
      <React.Fragment>
        <List size={100} marker={<CheckXS color="green" />}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
        <List size={200} marker={<CheckS color="green" />}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
        <List size={300} marker={<CheckS color="green" />}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
      </React.Fragment>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Init Blockquote', () => {
    const { getByTestId } = render(<Blockquote data-testid="tag" />);
    expect(getByTestId('tag')).toBeTruthy();
    expect(getByTestId('tag').tagName).toBe('BLOCKQUOTE');
  });

  test('Complex view Blockquote', async () => {
    const component = <Blockquote author="— Mr. Robot">Test text Blockquote</Blockquote>;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Text', () => {
  afterEach(cleanup);
  shouldSupportClassName(Text);
  shouldSupportRef(Text);

  test('Should support lineHeight property', () => {
    const LH = '100px';
    const { getByText } = render(
      <Text size={100} lineHeight={LH}>
        Text
      </Text>,
    );
    const nodeStyles = window.getComputedStyle(getByText('Text'));
    const { lineHeight } = nodeStyles; // here we got var(--whatever);
    const LHCustomProperty = lineHeight.replace(/(var\()|\)/g, '');
    expect(nodeStyles.getPropertyValue(LHCustomProperty)).toBe(LH);
  });
});

describe('Blockquote', () => {
  afterEach(cleanup);
  shouldSupportClassName(Blockquote);
  shouldSupportRef(Blockquote);
});

describe('List', () => {
  afterEach(cleanup);
  shouldSupportClassName(List);
  shouldSupportRef(List);
});

describe('Hint', () => {
  afterEach(cleanup);
  shouldSupportClassName(Hint);
  shouldSupportRef(Hint);

  test('render with Addon and Text', async () => {
    const component = (
      <Hint>
        <Hint.Addon>Left</Hint.Addon>
        <Hint.Text>Test</Hint.Text>
        <Hint.Addon>Right</Hint.Addon>
      </Hint>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support prop active and not active', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Hint>Hint</Hint>
        <Hint active>Hint</Hint>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
