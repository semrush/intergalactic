import React from 'react';
import { cleanup, render } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import Divider from '../src';

describe('Divider', () => {
  afterEach(cleanup);

  shouldSupportRef(Divider);
  shouldSupportClassName(Divider);

  test('should support custom attributes', () => {
    const { getByTestId } = render(<Divider data-testid="divider" name="divider" />);

    expect(getByTestId('divider').attributes['name'].value).toBe('divider');
  });

  test('should support use, theme, orientation props', async () => {
    const component = (
      <snapshot.ProxyProps>
        <div style={{ width: 100 }}>
          <Divider use="primary" />
        </div>
        <br />
        <div style={{ width: 100 }}>
          <Divider use="secondary" />
        </div>
        <br />
        <div style={{ width: 100 }}>
          <Divider use="primary" theme="invert" />
        </div>
        <br />
        <div style={{ width: 100 }}>
          <Divider use="secondary" theme="invert" />
        </div>
        <br />
        <div style={{ height: 100 }}>
          <Divider use="primary" orientation="vertical" />
        </div>
        <br />
        <div style={{ height: 100 }}>
          <Divider use="secondary" orientation="vertical" />
        </div>
        <br />
        <div style={{ height: 100 }}>
          <Divider use="primary" theme="invert" orientation="vertical" />
        </div>
        <br />
        <div style={{ height: 100 }}>
          <Divider use="secondary" theme="invert" orientation="vertical" />
        </div>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support correct render in center Flex block', async () => {
    const component = (
      <snapshot.ProxyProps>
        {/* fix for screenshot height 20, in browser all work*/}
        <div style={{ display: 'flex', alignItems: 'center', width: 100, height: 20 }}>
          <div style={{ width: '50%', height: 20, background: 'yellow' }}></div>
          <Divider orientation="vertical" />
          <div style={{ width: '50%', height: 20, background: 'yellow' }}></div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 100 }}
        >
          <div style={{ height: '20px', background: 'yellow' }}></div>
          <Divider orientation="horizontal" />
          <div style={{ height: '20px', background: 'yellow' }}></div>
        </div>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
