import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach, vi } from 'vitest';
import Calendar from '@semcore/icon/Calendar/m';

const { cleanup, render, axe } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Link from '../src';
import CheckM from '@semcore/icon/Check/m';
import EditXS from '@semcore/icon/Edit/m';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

describe('Link', () => {
  afterEach(cleanup);

  shouldSupportClassName(Link, React.Fragment, { children: 'Link' });
  shouldSupportRef(Link, React.Fragment, { children: 'Link' });

  test('Should support custom attributes', () => {
    const { getByTestId } = render(
      <Link data-testid="link" name="test">
        Link
      </Link>,
    );
    expect(getByTestId('link').attributes['name'].value).toBe('test');
  });

  test('Should support children', async () => {
    const component = (
      <Link>
        <p data-testid="child">Test</p>
      </Link>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test('Should support additional elements', async () => {
    const component = (
      <Link>
        <Link.Addon>ICON</Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>ICON</Link.Addon>
      </Link>
    );
    const { queryAllByText } = render(component);
    const additional = queryAllByText('ICON');

    expect(additional).toHaveLength(2);
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support additional elements as props', async () => {
    const component = (
      <Link addonLeft={Calendar} addonRight={Calendar}>
        Text
      </Link>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support change tag name', () => {
    const { getByTestId } = render(
      <Link data-testid="link" tag="span">
        Link
      </Link>,
    );
    expect(getByTestId('link').tagName).toBe('SPAN');
  });

  test('Should support normal state', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Link active>Link</Link>
        <Link active>
          <Link.Addon tag={Calendar} />
          <Link.Text>Link</Link.Text>
          <Link.Addon>
            <Calendar />
          </Link.Addon>
        </Link>
        <Link disabled>Link</Link>
        <Link keyboardFocused>Link</Link>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support inline property', () => {
    const { rerender, getByTestId } = render(<Link data-testid="link">Link</Link>);
    expect(getComputedStyle(getByTestId('link')).display).toBe('inline-block');
    rerender(
      <Link data-testid="link" inline>
        Link
      </Link>,
    );
    expect(getComputedStyle(getByTestId('link')).display).toBe('inline');
  });

  test('Should support ellipsis links with addon', async () => {
    const component = (
      <div style={{ width: '66%' }}>
        <Link w="100%" wMin={0}>
          <Flex alignItems="center">
            <Link.Text w="100%" inline noWrap>
              <Text w="100%" inline noWrap>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
                Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
                Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
              </Text>
            </Link.Text>
            <Link.Addon>
              <EditXS />
            </Link.Addon>
          </Flex>
        </Link>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support noWrap property', () => {
    const { rerender, getByTestId } = render(<Link data-testid="link">Link</Link>);
    expect(getComputedStyle(getByTestId('link'))['white-space']).toBe('nowrap');
    rerender(
      <Link data-testid="link" noWrap={false}>
        Link
      </Link>,
    );
    expect(getComputedStyle(getByTestId('link'))['white-space']).toBe('');
  });

  test('Should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Link size={100}>Link</Link>
        <Link size={200}>Link</Link>
        <Link size={300}>Link</Link>
        <Link size={400}>Link</Link>
        <Link size={500}>Link</Link>
        <Link size={600}>Link</Link>
        <Link size={700}>Link</Link>
        <Link size={800}>Link</Link>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hover', async () => {
    const component = <Link id="link">Link</Link>;
    expect(
      await snapshot(component, {
        actions: {
          hover: '#link',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support custom color', async () => {
    const component = <Link color="salad-400">Link</Link>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hover custom color', async () => {
    const component = (
      <Link id="link" color="salad-400">
        Link
      </Link>
    );
    expect(
      await snapshot(component, {
        actions: {
          hover: '#link',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Renders correctly with one Addon as props', async () => {
    const component = <Link addonLeft={CheckM} aria-label="Check" />;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Link disabled>Link</Link>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
