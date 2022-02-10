import * as React from 'react';
import { cleanup } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import Slider from '../src';

describe('Slider', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = <Slider value={50} />;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support color change', async () => {
    const component = (
      <div style={{ width: 150, height: 20 }}>
        <Slider mt={5} value={20} background="#66ccf750">
          <Slider.Bar color="#8bc83550" />
          <Slider.Knob color="#1d9c00" />
        </Slider>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
