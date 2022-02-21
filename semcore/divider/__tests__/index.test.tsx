import React from 'react';
import { cleanup } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import Divider from '../src';

describe('Divider', () => {
  afterEach(cleanup);

  shouldSupportRef(Divider);
  shouldSupportClassName(Divider);

  test('renders correctly', async () => {
    const component = <Divider w={100} m={1} />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support use, theme', async () => {
    const component = (
      <snapshot.ProxyProps style={{ width: 100, margin: '5px' }}>
        <Divider use="primary" />
        <Divider use="secondary" />
        <Divider use="primary" theme="default" />
        <Divider use="secondary" theme="default" />
        <Divider use="primary" theme="invert" />
        <Divider use="secondary" theme="invert" />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support orientation prop', async () => {
    const component = (
      <>
        <Divider orientation="horizontal" w={100} m={1} />
        <Divider orientation="vertical" h={100} m={1} />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support orientation and use, theme props', async () => {
    const component = (
      <>
        <Divider orientation="horizontal" use="secondary" w={100} m={1} />
        <Divider orientation="horizontal" use="secondary" theme="default" w={100} m={1} />
        <Divider orientation="horizontal" use="secondary" theme="invert" w={100} m={1} />
        <Divider orientation="vertical" use="secondary" h={100} m={1} />
        <Divider orientation="vertical" use="secondary" theme="default" h={100} m={1} />
        <Divider orientation="vertical" use="secondary" theme="invert" h={100} m={1} />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support correct render in center Flex block', async () => {
    const component = (
      <snapshot.ProxyProps>
        {/* fix for screenshot height 20, in browser all work*/}
        <div style={{ display: 'flex', alignItems: 'center', width: 100, height: 20 }}>
          <div style={{ width: '50%', height: 20, background: 'yellow' }} />
          <Divider orientation="vertical" />
          <div style={{ width: '50%', height: 20, background: 'yellow' }} />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 100 }}
        >
          <div style={{ height: '20px', background: 'yellow' }} />
          <Divider orientation="horizontal" />
          <div style={{ height: '20px', background: 'yellow' }} />
        </div>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
