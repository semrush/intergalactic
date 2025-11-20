import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/d3-chart/radar';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale}>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Radar.Polygon dataKey='data_1' color='chart-palette-order-1'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2' color='chart-palette-order-2'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = RadarMockData.Default;

export default Demo;
