import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Spin from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';

describe('Spin', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Spin />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support centered', async ({ task }) => {
    const component = (
      <div style={{ display: 'flex', width: 200, height: 200 }}>
        <Spin centered />
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support theme', async ({ task }) => {
    const component = (
      <div style={{ background: '#979797' }}>
        <Spin theme="dark" />
        <Spin theme="invert" />
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom theme', async ({ task }) => {
    const component = (
      <>
        <Spin theme="blanchedalmond" />
        <Spin theme="#3eeb4c" />
        <Spin theme="dark-violet" />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support size', async ({ task }) => {
    const component = (
      <>
        <Spin size="xs" />
        <Spin size="s" />
        <Spin size="m" />
        <Spin size="l" />
        <Spin size="xl" />
        <Spin size="xxl" />
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
