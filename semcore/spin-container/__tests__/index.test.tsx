import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import SpinContainer from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';

describe('SpinContainer', () => {
  beforeEach(cleanup);

  test.concurrent('Render correctly', async ({ task }) => {
    const component = (
      <>
        <SpinContainer>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
        <SpinContainer loading>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly with Overlay', async ({ task }) => {
    const component = (
      <SpinContainer loading>
        <SpinContainer.Content>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer.Content>
        <SpinContainer.Overlay>Custom Spin</SpinContainer.Overlay>
      </SpinContainer>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom background', async ({ task }) => {
    const component = (
      <>
        <SpinContainer background={'blanchedalmond'} loading>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
        <SpinContainer background={'#3eeb4c'} loading>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
        <SpinContainer background={'dark-violet'} loading>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
