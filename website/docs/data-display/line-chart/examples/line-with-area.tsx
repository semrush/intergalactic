import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/d3-chart';
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
      <Line x='x' y='y'>
        <Line.Area y0='y0' y1='y1' />
      </Line>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => {
    const y = Math.random() * 10;

    return {
      x: i,
      y,
      y0: y + 2,
      y1: y - 2,
    };
  });

export default Demo;
