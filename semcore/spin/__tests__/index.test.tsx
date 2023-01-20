import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Spin from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';

describe('Spin', () => {
  beforeEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Spin />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support centered', async () => {
    const component = (
      <div style={{ display: 'flex', width: 200, height: 200 }}>
        <Spin centered />
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support theme', async () => {
    const component = (
      <div style={{ background: '#979797' }}>
        <Spin theme="dark" />
        <Spin theme="invert" />
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom theme', async () => {
    const component = (
      <>
        <Spin theme="blanchedalmond" />
        <Spin theme="#3eeb4c" />
        <Spin theme="dark-violet" />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support size', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
