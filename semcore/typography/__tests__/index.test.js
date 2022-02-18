import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup, render, axe } = testing;

import Check from '@semcore/icon/Check/m';
import { Blockquote, List, Text, Hint } from '../src';
import { snapshot } from '@semcore/jest-preset-ui';
import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;

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
        <List size={100} marker={<Check color="green" />}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
        <List size={200} marker={<Check color="green" />}>
          <List.Item>Test size Ul</List.Item>
          <List.Item>Test size Ul</List.Item>
        </List>
        <List size={300} marker={<Check color="green" />}>
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

  test('a11y', async () => {
    const { container } = render(
      <div>
        <Text size={800} tag="h1" mb={6} mt={0}>
          H1, 48px
        </Text>
        <Text tag="p" mb={2} mt={0}>
          But I do love the taste of a <Text tag="strong">good burger</Text>. Mm-mm-mm.
        </Text>
        <Text size={700} tag="h2" mb={4} mt={0}>
          H2, 36px
        </Text>
        <Text tag="p" mb={2} mt={0}>
          But I do love the taste of a <Text tag="em">good burger</Text>. Mm-mm-mm.
        </Text>
        <Text size={600} tag="h3" fontWeight={500} mb={4} mt={0}>
          H3, 33px
        </Text>
        <Text tag="p" mb={2} mt={0}>
          But I do love the taste of a <Text color="green">good burger</Text>. Mm-mm-mm.
        </Text>
        <Text size={500} tag="h4" fontWeight={500} mb={3} mt={0}>
          H4, 25px
        </Text>
        <Text tag="p" mb={2} mt={0}>
          But I do love the taste of a <Hint>good burger</Hint>. Mm-mm-mm.
        </Text>
        <Text size={400} tag="h5" fontWeight={500} mb={2} mt={0}>
          H5, 19px
        </Text>
        <Text tag="p" mb={2} mt={0}>
          But I do love the taste of a <Text tag="s">good burger</Text>. Mm-mm-mm.
        </Text>
        <Text size={300} tag="h6" mb={1} mt={0}>
          H6, 16px
        </Text>
        <Text size={200} tag="p" mb={3} mt={0}>
          Text, 14px
        </Text>
        <Text size={100} tag="p" mb={2} mt={0}>
          Text, 12px
        </Text>
        <List mb={2}>
          <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
          <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
        </List>
        <List tag="ol" mb={2}>
          <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
          <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
        </List>
        <Blockquote author="Author Author" my={4.5}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod
          tincidunt ut lacreet dolore magna aliguam erat volutpat. Ut wisis enim ad minim veniam,
          quis nostrud exerci tution ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </Blockquote>
      </div>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
