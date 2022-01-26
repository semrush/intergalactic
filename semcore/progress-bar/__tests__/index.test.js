import React from 'react';
import { cleanup, render } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import ProgressBar from '../src';

describe('ProgressBar', () => {
  afterEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(
      <ProgressBar data-testid="notice" className="more-than one-class" />,
    );
    expect(getByTestId('notice').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(<ProgressBar data-testid="notice" name="notice" />);
    expect(getByTestId('notice').attributes['name'].value).toBe('notice');
  });

  test('should support children', () => {
    const component = (
      <ProgressBar data-testid="parent">
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
      </ProgressBar>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('parent').children.length).toEqual(3);
  });

  test('should support dark view', async () => {
    const component = (
      <div style={{ width: '200px', padding: '10px', background: 'black' }}>
        <ProgressBar value={50} theme="dark" />
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support size props', async () => {
    const component = (
      <div style={{ width: '200px' }}>
        <ProgressBar value={50} size="l" />
        <br />
        <ProgressBar value={50} size="m" />
        <br />
        <ProgressBar value={50} size="s" />
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support custom theme', async () => {
    const component = (
      <div style={{ width: '200px' }}>
        <ProgressBar
          value={undefined}
          theme="linear-gradient(-45deg,yellow 25%,green 0,green 50%,yellow 0,yellow 76%,green 0)"
        />
        <br />
        <ProgressBar value={undefined} theme="yellow" />
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
describe('ProgressBar.Value', () => {
  shouldSupportClassName(ProgressBar.Value, ProgressBar);
  shouldSupportRef(ProgressBar.Value, ProgressBar);

  test('should support custom theme', async () => {
    const component = (
      <div style={{ width: '200px' }}>
        <ProgressBar value={50}>
          <ProgressBar.Value theme="linear-gradient(-45deg,yellow 25%,green 0,green 50%,yellow 0,yellow 76%,green 0)" />
        </ProgressBar>
        <br />
        <ProgressBar value={50}>
          <ProgressBar.Value theme="yellow" />
        </ProgressBar>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
