import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/d3-chart/line';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Line x='x' y='line1'>
        <Line.Dots display />
      </Line>
      <Line x='x' y='line2'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = LineMockData.Interpolation;

export default Demo;
