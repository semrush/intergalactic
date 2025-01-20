import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Plot, Bar, XAxis, YAxis } from '@semcore/d3-chart';

const Demo = () => {
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
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
        <YAxis.Title>YAxis title</YAxis.Title>
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Title>XAxis title</XAxis.Title>
      </XAxis>
      <Bar x='category' y='bar' />
    </Plot>
  );
};
const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random() * 10,
  }));

export default Demo;
