import React from 'react';
import { Plot, Line, minMax } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

export default () => {
  const width = 500;
  const height = 300;

  const xScale = scaleLinear().range([0, width]).domain(minMax(data, 'x'));

  const yScale = scaleLinear().range([height, 0]).domain(minMax(data, 'y'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <Line x="x" y="y" />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random().toFixed(1) * 10,
  }));
