import React from 'react';
import { Plot, Bar, Line, HoverRect, HoverLine, YAxis, XAxis, minMax } from '@semcore/d3-chart';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import { scaleLinear, scaleBand } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const resolveColor = useColorResolver();

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
      <HoverLine x='category' />
      <HoverRect x='category' />
      <Bar x='category' y='bar' />
      <Line
        x='category'
        y='bar'
        color='chart-palette-order-total-amount'
        style={{ strokeWidth: 3, strokeDasharray: 5 }}
      >
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    category: i,
    bar: Math.random() * i,
  }));

export default Demo;
