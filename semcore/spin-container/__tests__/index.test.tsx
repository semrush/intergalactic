import * as React from 'react';
import { testing, snapshot } from '@semcore/cli/tools/jest-preset-ui';
import SpinContainer from '../src';

const { cleanup } = testing;

describe('SpinContainer', () => {
  afterEach(cleanup);

  test('Render correctly', async () => {
    const Component = (
      <>
        <SpinContainer>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
        <SpinContainer loading>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer>
      </>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Render correctly with Overlay', async () => {
    const Component = (
      <SpinContainer loading>
        <SpinContainer.Content>
          <div style={{ width: 200, height: 200 }}>Hello world</div>
        </SpinContainer.Content>
        <SpinContainer.Overlay>Custom Spin</SpinContainer.Overlay>
      </SpinContainer>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test('Should support custom background', async () => {
    const Component = (
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
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });
});
