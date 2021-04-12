import React from 'react';
import { Chart, Bar, Line, HoverRect, HoverLine, YAxis, XAxis, minMax } from '@semcore/d3-chart';
import resolveColor from '@semcore/utils/lib/color';
import { scaleLinear, scaleBand } from 'd3-scale';

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
    .domain(minMax(data, 'bar'));

  return (
    <Chart data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis ticks={yScale.ticks()}>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis ticks={xScale.domain()}>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine x="category" />
      <HoverRect x="category" />
      <Bar x="category" y="bar" />
      <Line
        x="category"
        y="bar"
        color={resolveColor('wall')}
        style={{ strokeWidth: 3, strokeDasharray: 5 }}
      >
        <Line.Dots display />
      </Line>
    </Chart>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    category: i,
    bar: Math.random().toFixed(1) * i,
  }));
