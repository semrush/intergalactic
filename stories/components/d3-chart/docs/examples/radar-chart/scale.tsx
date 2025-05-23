import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Plot, Radar } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const width = 250;
  const height = 250;

  const scale_1 = scaleLinear().domain([0, 10]);
  const scale_2 = scaleLinear().domain([0, 20]);

  return (
    <Flex>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale_1}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale_2}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </Flex>
  );
};

const data = {
  categories: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6'],
  data_1: [10, 2, 10, 2, 10, 2],
};

export default Demo;
