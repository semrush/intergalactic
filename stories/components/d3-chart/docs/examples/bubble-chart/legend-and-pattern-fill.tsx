import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import BubbleMockData from '../../../__mocks__/bubble';

const legendProps = {
  shape: 'Checkbox' as const,
};

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([0, 10]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-2, 10]);

  return (
    <Chart.Bubble
      data={data}
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      legendProps={legendProps}
      patterns
      aria-label='Bubble chart'
    />
  );
};

const data = BubbleMockData.LabelAndColor;

export default Demo;
