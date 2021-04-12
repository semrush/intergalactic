import React from 'react';
import { Chart, XAxis, YAxis, HoverLine, minMax } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(minMax(data, 'y'));

  return (
    <Chart data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis ticks={yScale.ticks()}>
        <YAxis.Ticks />
      </YAxis>
      <XAxis ticks={xScale.ticks()}>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine x="x" y="y" />
    </Chart>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: i,
  }));
