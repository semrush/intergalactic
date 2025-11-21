import { Flex } from '@semcore/ui/base-components';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  const width = 250;
  const height = 250;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Flex>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale}>
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

const data = RadarMockData.LongLabel;

export default Demo;
