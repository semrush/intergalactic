import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax, interpolateValue } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

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

const data = [
  {
    x: 0,
    line1: 5,
    line2: 3,
  },
  {
    x: 1,
    line1: 8,
    line2: interpolateValue,
  },
  {
    x: 2,
    line1: 4,
    line2: 8,
  },
  {
    x: 3,
    line1: 5,
    line2: interpolateValue,
  },
  {
    x: 4,
    line1: 5,
    line2: interpolateValue,
  },
  {
    x: 5,
    line1: 3,
    line2: 1,
  },
];

export default Demo;
