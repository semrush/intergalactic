import React from 'react';
import { cleanup } from 'jest-preset-ui/testing';
import snapshot from 'jest-preset-ui/snapshot';
import Slider from '../src';

describe('Slider', () => {
  afterEach(cleanup);

  test('should support default value', async () => {
    const component = (
      <div style={{ width: 150, height: 20 }}>
        <Slider mt={5} value={50} />
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support color change', async () => {
    const component = (
      <div style={{ width: 150, height: 20 }}>
        <Slider mt={5} value={20} background="#66ccf750">
          <Slider.Knob color="#1d9c00" />
          <Slider.Bar color="#8bc83550" />
        </Slider>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
