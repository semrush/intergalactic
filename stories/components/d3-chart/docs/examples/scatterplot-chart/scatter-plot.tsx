import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import ScatterplotMockData from '../../../__mocks__/scatterplot';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([-1, 21]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 11]);

  return (
    <Chart.ScatterPlot
      data={data}
      groupKey='x'
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      aria-label='Scatterplot chart'
    />
  );
};

const data = ScatterplotMockData.Default;

export default Demo;
