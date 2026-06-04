import { Plot, Bar, Line, HoverRect, HoverLine, YAxis, XAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

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
      <HoverLine x='category' />
      <HoverRect x='category' />
      <Bar x='category' y='bar' />
      <Line
        x='category'
        y='bar'
        color='chart-palette-order-total-amount'
        style={{ strokeWidth: 3, strokeDasharray: '6 6' }}
      >
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = BarMockData.Default;

export default Demo;
