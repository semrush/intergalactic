import React from 'react';
import { Plot, Radar } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

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

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

export default Demo;
