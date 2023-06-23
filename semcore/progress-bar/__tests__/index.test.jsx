import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import ProgressBar from '../src';

describe('ProgressBar', () => {
  beforeEach(cleanup);

  shouldSupportClassName(ProgressBar);
  shouldSupportRef(ProgressBar);

  test.concurrent('Should support children', () => {
    const component = (
      <ProgressBar data-testid='parent'>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
      </ProgressBar>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('parent').children.length).toEqual(3);
  });

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: '200px' }}>
        <ProgressBar />
        <ProgressBar value={0} />
        <ProgressBar value={50} />
        <ProgressBar value={100} />
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support dark view', async ({ task }) => {
    const component = (
      <div style={{ width: '200px', padding: '10px', background: 'black' }}>
        <ProgressBar value={50} theme='dark' />
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size props', async ({ task }) => {
    const component = (
      <div style={{ width: '200px' }}>
        <ProgressBar value={50} size='l' />
        <br />
        <ProgressBar value={50} size='m' />
        <br />
        <ProgressBar value={50} size='s' />
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom theme', async ({ task }) => {
    const component = (
      <div style={{ width: '200px' }}>
        <ProgressBar
          value={undefined}
          theme='linear-gradient(-45deg,yellow 25%,green 0,green 50%,yellow 0,yellow 76%,green 0)'
        />
        <br />
        <ProgressBar value={undefined} theme='yellow' />
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
describe('ProgressBar.Value', () => {
  shouldSupportClassName(ProgressBar.Value, ProgressBar);
  shouldSupportRef(ProgressBar.Value, ProgressBar);

  test.concurrent('Should support custom theme', async ({ task }) => {
    const component = (
      <div style={{ width: '200px' }}>
        <ProgressBar value={50}>
          <ProgressBar.Value theme='linear-gradient(-45deg,yellow 25%,green 0,green 50%,yellow 0,yellow 76%,green 0)' />
        </ProgressBar>
        <br />
        <ProgressBar value={50}>
          <ProgressBar.Value theme='yellow' />
        </ProgressBar>
      </div>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
