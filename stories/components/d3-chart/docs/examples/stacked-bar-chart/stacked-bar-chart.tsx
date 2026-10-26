import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import StackedBarMockData from '../../../__mocks__/stacked-bar';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 220;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.bar))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 20]);

  return (
    <Chart.Bar
      groupKey='bar'
      data={data}
      type='stack'
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      showLegend={false}
      showTotalInTooltip
      aria-label='Stacked bar chart'
    />
  );
};

const data = StackedBarMockData.Default;

export default Demo;
