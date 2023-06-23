import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Divider from '../src';

import { cleanup } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Divider', () => {
  beforeEach(cleanup);

  shouldSupportRef(Divider);
  shouldSupportClassName(Divider);

  test.concurrent('renders correctly', async ({ task }) => {
    const component = <Divider w={100} m={1} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support use, theme', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ width: 100, margin: '5px' }}>
        <Divider use='primary' />
        <Divider use='secondary' />
        <Divider use='primary' theme='default' />
        <Divider use='secondary' theme='default' />
        <Divider use='primary' theme='invert' />
        <Divider use='secondary' theme='invert' />
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support orientation prop', async ({ task }) => {
    const component = (
      <>
        <Divider orientation='horizontal' w={100} m={1} />
        <Divider orientation='vertical' h={100} m={1} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support orientation and use, theme props', async ({ task }) => {
    const component = (
      <>
        <Divider orientation='horizontal' use='secondary' w={100} m={1} />
        <Divider orientation='horizontal' use='secondary' theme='default' w={100} m={1} />
        <Divider orientation='horizontal' use='secondary' theme='invert' w={100} m={1} />
        <Divider orientation='vertical' use='secondary' h={100} m={1} />
        <Divider orientation='vertical' use='secondary' theme='default' h={100} m={1} />
        <Divider orientation='vertical' use='secondary' theme='invert' h={100} m={1} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support correct render in center Flex block', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps>
        {/* fix for screenshot height 20, in browser all work*/}
        <div style={{ display: 'flex', alignItems: 'center', width: 100, height: 20 }}>
          <div style={{ width: '50%', height: 20, background: 'yellow' }} />
          <Divider orientation='vertical' />
          <div style={{ width: '50%', height: 20, background: 'yellow' }} />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 100 }}
        >
          <div style={{ height: '20px', background: 'yellow' }} />
          <Divider orientation='horizontal' />
          <div style={{ height: '20px', background: 'yellow' }} />
        </div>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
