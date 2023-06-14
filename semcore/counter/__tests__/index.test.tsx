import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

import Counter from '../src';

describe('Counter', () => {
  beforeEach(cleanup);

  test.concurrent('renders correctly', async ({ task }) => {
    const component = <Counter>42</Counter>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support size props', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Counter size="xl">42</Counter>
        <Counter size="l">42</Counter>
        <Counter size="m">42</Counter>
      </snapshot.ProxyProps>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support theme props', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
