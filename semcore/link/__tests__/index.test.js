import React from 'react';
import { cleanup, render, axe } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import propsForElement from '@semcore/utils/lib/propsForElement';
import Link from '../src';

describe('Link', () => {
  afterEach(cleanup);

  shouldSupportClassName(Link);
  shouldSupportRef(Link);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Link data-testid="link" name="test" />);
    expect(getByTestId('link').attributes['name'].value).toBe('test');
  });

  test('should support children', async () => {
    const component = (
      <Link>
        <p data-testid="child">Test</p>
      </Link>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test('should support additional elements', async () => {
    const component = (
      <Link>
        <Link.Addon>
          <span>ICON</span>
        </Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>
          <span>ICON</span>
        </Link.Addon>
      </Link>
    );
    const { queryAllByText } = render(component);
    const additional = queryAllByText('ICON');

    expect(additional).toHaveLength(2);
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support additional elements as props', async () => {
    const Addon = React.forwardRef(function(p, ref) {
      return (
        <span ref={ref} {...propsForElement(p)}>
          Addon prop
        </span>
      );
    });
    const component = (
      <Link addonLeft={Addon} addonRight={Addon}>
        Text
      </Link>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support change tag name', () => {
    const { getByTestId } = render(<Link data-testid="link" tag="span" />);
    expect(getByTestId('link').tagName).toBe('SPAN');
  });

  test('should support active property', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Link active>Link</Link>
        <Link active>
          <Link.Addon>
            <span>ICON</span>
          </Link.Addon>
          <Link.Text>Link</Link.Text>
          <Link.Addon>
            <span>ICON</span>
          </Link.Addon>
        </Link>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support inline property', () => {
    const { getByTestId } = render(<Link data-testid="link" tag="span" inline />);
    expect(getComputedStyle(getByTestId('link')).display).toBe('inline');
  });

  test('should support normal render when noWrap=true (default) for all sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Link active>Link</Link>
        <Link active size={100}>
          Link
        </Link>
        <Link active size={200}>
          Link
        </Link>
        <Link active size={300}>
          Link
        </Link>
        <Link active size={400}>
          Link
        </Link>
        <Link active size={500}>
          Link
        </Link>
        <Link active size={600}>
          Link
        </Link>
        <Link active size={700}>
          Link
        </Link>
        <Link active size={800}>
          Link
        </Link>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Link disabled>Link</Link>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
