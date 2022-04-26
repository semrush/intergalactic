import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import Calendar from '@semcore/icon/Calendar/m';
const { cleanup, render, axe } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Link from '../src';

describe('Link', () => {
  afterEach(cleanup);

  shouldSupportClassName(Link);
  shouldSupportRef(Link);

  test('Should support custom attributes', () => {
    const { getByTestId } = render(<Link data-testid="link" name="test" />);
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
    const { getByTestId } = render(<Link data-testid="link" tag="span" />);
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
    const { rerender, getByTestId } = render(<Link data-testid="link" />);
    expect(getComputedStyle(getByTestId('link')).display).toBe('inline-block');
    rerender(<Link data-testid="link" inline />);
    expect(getComputedStyle(getByTestId('link')).display).toBe('inline');
  });

  test('Should support noWrap property', () => {
    const { rerender, getByTestId } = render(<Link data-testid="link" />);
    expect(getComputedStyle(getByTestId('link'))['white-space']).toBe('nowrap');
    rerender(<Link data-testid="link" noWrap={false} />);
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

  test('a11y', async () => {
    const { container } = render(<Link disabled>Link</Link>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
