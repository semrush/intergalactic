import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup, render } = testing;
import { snapshot } from '@semcore/jest-preset-ui';
import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import ProgressBar from '../src';

describe('ProgressBar', () => {
  afterEach(cleanup);

  shouldSupportClassName(ProgressBar);
  shouldSupportRef(ProgressBar);

  test('Should support children', () => {
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

  test('Renders correctly', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: '200px' }}>
        <ProgressBar />
        <ProgressBar value={0} />
        <ProgressBar value={50} />
        <ProgressBar value={100} />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support dark view', async () => {
    const component = (
      <div style={{ width: '200px', padding: '10px', background: 'black' }}>
        <ProgressBar value={50} theme="dark" />
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size props', async () => {
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

  test('Should support custom theme', async () => {
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

  test('Should support custom theme', async () => {
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
