import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, fireEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Icon from '../src';

describe('icon Dependency imports', () => {
  runDependencyCheckTests('icon');
});

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

  test('should support children', () => {
    const { getByTestId } = render(
      <Icon>
        <p data-testid='child'>Test</p>
      </Icon>,
    );
    expect(getByTestId('child')).toBeTruthy();
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
});
