import { Bar, XAxis, Chart, YAxis } from '@semcore/d3-chart';
import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);
  return (
    <Chart data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis ticks={yScale.ticks()}>
        <YAxis.Ticks />
        <YAxis.Grid />
        <YAxis.Title>YAxis title</YAxis.Title>
      </YAxis>
      <XAxis ticks={xScale.domain()}>
        <XAxis.Ticks />
        <XAxis.Title>XAxis title</XAxis.Title>
      </XAxis>
      <Bar x="category" y="bar" />
    </Chart>
  );
};
const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random().toFixed(1) * 10,
  }));
