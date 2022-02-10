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

  test('Renders correctly with Bar/Knob', async () => {
    const component = (
      <Slider value={50}>
        <Slider.Bar />
        <Slider.Knob />
      </Slider>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support disabled', async () => {
    const component = <Slider value={50} disabled />;

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
