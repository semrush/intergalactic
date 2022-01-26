import React from 'react';
import { cleanup, render } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import Spin from '../src';

describe('Spin', () => {
  afterEach(cleanup);

  shouldSupportClassName(Spin);
  shouldSupportRef(Spin);

  test('Should support custom attributes', () => {
    const { getByTestId } = render(<Spin data-testid="spin" name="spinner" />);
    expect(getByTestId('spin').attributes['name'].value).toEqual('spinner');
  });

  xtest('Should not support children', () => {
    const { getByTestId } = render(
      <Spin data-testid="spin">
        <p />
      </Spin>,
    );

    expect(getByTestId('spin').querySelectorAll('p').length).toEqual(0);
  });

  test('Should render correctly', async () => {
    const Component = (
      <div style={{ width: '200px' }}>
        <Spin />
      </div>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test("Should support 'centered' prop", async () => {
    const Component = (
      <div style={{ width: '200px' }}>
        <Spin centered />
      </div>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test("Should support 'theme' prop", async () => {
    const Component = (
      <div style={{ background: '#eee' }}>
        <Spin />
        <Spin theme="invert" />
        <Spin theme="red" />
      </div>
    );
    expect(await snapshot(Component)).toMatchImageSnapshot();
  });

  test("Should support 'size' props", async () => {
    const Component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Spin size="xxs" />
          <Spin size="xs" />
          <Spin size="s" />
          <Spin size="m" />
          <Spin size="l" />
          <Spin size="xl" />
          <Spin size="xxl" />
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(Component)).toMatchImageSnapshot();
  });
});
