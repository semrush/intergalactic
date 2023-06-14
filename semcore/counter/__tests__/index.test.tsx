import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

import Counter from '../src';

describe('Counter', () => {
  beforeEach(cleanup);

  test('renders correctly', async () => {
    const component = <Counter>42</Counter>;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

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
          <Counter theme="warning">42</Counter>
          <Counter theme="danger">42</Counter>
          <Counter theme="light-blue">42</Counter>
          <Counter theme="white">42</Counter>
        </snapshot.ProxyProps>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
