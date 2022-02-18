import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import { snapshot } from '@semcore/jest-preset-ui';
import Counter from '../src';

describe('Counter', () => {
  afterEach(cleanup);

  test('should support size props', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Counter size="xl">42</Counter>
        <Counter size="l">42</Counter>
        <Counter size="m">42</Counter>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('should support theme props', async () => {
    const component = (
      <div style={{ background: '#eee' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <Counter>42</Counter>
          <Counter theme="orange">42</Counter>
          <Counter theme="light-blue">42</Counter>
          <Counter theme="white">42</Counter>
        </snapshot.ProxyProps>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
