import React from 'react';
import { snapshot, testing } from '@semcore/jest-preset-ui';
import Icon from '../src';

const { render, cleanup, axe } = testing;

describe('Icon', () => {
  afterEach(cleanup);

  test.each(['200', '100%'], 'should support custom width %i', (width) => {
    const { getByTestId } = render(<Icon data-testid="icon" width={width} />);
    expect(getByTestId('icon').attributes['width'].value).toBe(width);
  });

  test.each(['200', '100%'], 'should support custom height %i', (height) => {
    const { getByTestId } = render(<Icon data-testid="icon" height={height} />);
    expect(getByTestId('icon').attributes['height'].value).toBe(height);
  });

  test('should support custom viewBox', () => {
    const { getByTestId } = render(<Icon data-testid="icon" viewBox="1 2 3 4" />);
    expect(getByTestId('icon').attributes['viewBox'].value).toBe('1 2 3 4');
  });

  test('should support custom className', () => {
    const { getByTestId } = render(<Icon data-testid="icon" className="more-than one-class" />);
    expect(getByTestId('icon').attributes['class'].value).toMatch('more-than one-class');
  });

  test('should support property for Box', () => {
    const { getByTestId } = render(<Icon data-testid="icon" mr={2} />);
    expect(getByTestId('icon').attributes['style'].value).toMatch('margin-right: 8px;');
  });

  test('should support children', () => {
    const { getByTestId } = render(
      <Icon>
        <p data-testid="child">Test</p>
      </Icon>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  test('should render with svg element', async () => {
    const component = (
      <Icon width={22} height={22} viewBox="0 0 22 22">
        <polygon points="18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473"></polygon>
      </Icon>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support custom color', async () => {
    const component = (
      <Icon width={22} height={22} viewBox="0 0 22 22" color="green">
        <polygon points="18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473"></polygon>
      </Icon>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test("shouldn't change size in flex block", async () => {
    const component = (
      <div style={{ display: 'flex', width: '100px' }}>
        <Icon width={22} height={22} viewBox="0 0 22 22" color="green">
          <polygon points="18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473"></polygon>
        </Icon>
        <p>lorem lorem lorem lorem </p>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Icon width={22} height={22} viewBox="0 0 22 22" color="green">
        <polygon points="18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473"></polygon>
      </Icon>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
