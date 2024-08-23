import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Icon from '../src';

import { render, cleanup, fireEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Icon', () => {
  beforeEach(cleanup);

  test.each(['200', '100%'], 'should support custom width %i', (width) => {
    const { getByTestId } = render(<Icon data-testid='icon' width={width} />);
    expect(getByTestId('icon').attributes['width'].value).toBe(width);
  });

  test.each(['200', '100%'], 'should support custom height %i', (height) => {
    const { getByTestId } = render(<Icon data-testid='icon' height={height} />);
    expect(getByTestId('icon').attributes['height'].value).toBe(height);
  });

  test('should support custom viewBox', () => {
    const { getByTestId } = render(<Icon data-testid='icon' viewBox='1 2 3 4' />);
    expect(getByTestId('icon').attributes['viewBox'].value).toBe('1 2 3 4');
  });

  test('should support custom className', () => {
    const { getByTestId } = render(<Icon data-testid='icon' className='more-than one-class' />);
    expect(getByTestId('icon').attributes['class'].value).toMatch('more-than one-class');
  });

  test('should support property for Box', () => {
    const { getByTestId } = render(<Icon data-testid='icon' mr={2} />);
    expect(getByTestId('icon').attributes['style'].value).toMatch('margin-right: 8px;');
  });

  test('should aria-hidden be true if interactive is false', () => {
    const { getByTestId } = render(<Icon data-testid='icon' mr={2} interactive={false} />);
    expect(getByTestId('icon').attributes['aria-hidden'].value).toEqual('true');
  });

  test('should not be aria-hidden if interactive is true', () => {
    const { getByTestId } = render(
      <Icon data-testid='icon' mr={2} interactive={true} aria-label='Interactive icon!' />,
    );
    expect(getByTestId('icon').attributes['aria-hidden']?.value).toEqual(undefined);
  });

  test('should have class with pointer-events=none if interactive is false ', () => {
    const { getByTestId } = render(<Icon data-testid='icon' mr={2} interactive={false} />);
    expect(getByTestId('icon').attributes['class'].value).toMatch(/noPointerEvents/);
  });

  test('should support children', () => {
    const { getByTestId } = render(
      <Icon>
        <p data-testid='child'>Test</p>
      </Icon>,
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  test('should render with svg element', async ({ task }) => {
    const component = (
      <Icon width={22} height={22} viewBox='0 0 22 22'>
        <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
      </Icon>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support custom color', async ({ task }) => {
    const component = (
      <Icon width={22} height={22} viewBox='0 0 22 22' color='green'>
        <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
      </Icon>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test("shouldn't change size in flex block", async ({ task }) => {
    const component = (
      <div style={{ display: 'flex', width: '100px' }}>
        <Icon width={22} height={22} viewBox='0 0 22 22' color='green'>
          <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
        </Icon>
        <p>lorem lorem lorem lorem </p>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('should support call onClick', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(<Icon data-testid='icon' interactive aria-label='Test icon' />);

    fireEvent.keyDown(getByTestId('icon'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('should not call onClick with onKeydown', async () => {
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Icon
        data-testid='icon'
        onClick={onClick}
        onKeyDown={onKeyDown}
        interactive
        aria-label='test icon'
      />,
    );

    fireEvent.keyDown(getByTestId('icon'), { key: 'Enter' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('a11y', async () => {
    const { container } = render(
      <Icon width={22} height={22} viewBox='0 0 22 22' color='green'>
        <polygon points='18.532 3 7.501 14.054 3.468 10.012 1 12.485 7.501 19 21 5.473' />
      </Icon>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
