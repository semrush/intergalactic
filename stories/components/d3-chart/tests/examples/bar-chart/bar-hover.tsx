import React from 'react';
import { Plot, XAxis, YAxis, HoverRect, minMax } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';

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
    .domain(minMax(data, 'bar'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverRect x='category' />
    </Plot>
  );
};

const data = [
  { category: 'Category 0', bar: 1 },
  { category: 'Category 1', bar: 3 },
  { category: 'Category 2', bar: 5 },
  { category: 'Category 3', bar: 7 },
  { category: 'Category 4', bar: 9 },
];

export default Demo;
