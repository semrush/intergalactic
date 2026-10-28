import { Chart, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const colorMap = {
  line1: 'chart-palette-order-1',
  line2: 'chart-palette-order-1',
};

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
    <Chart.Line
      groupKey='x'
      data={data}
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      colorMap={colorMap}
      showDots
      showLegend={false}
      showTooltip={false}
      aria-label='Line chart'
    />
  );
};

const data = LineMockData.Interpolation;

export default Demo;
