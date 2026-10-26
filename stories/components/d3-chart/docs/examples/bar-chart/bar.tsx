import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Chart.Bar
      groupKey='category'
      data={data}
      plotWidth={width}
      plotHeight={height}
      marginX={MARGIN}
      marginY={MARGIN}
      yScale={yScale}
      aria-label='Bar chart'
      showTooltip={false}
    />
  );
};

const data = BarMockData.Default;

export default Demo;
