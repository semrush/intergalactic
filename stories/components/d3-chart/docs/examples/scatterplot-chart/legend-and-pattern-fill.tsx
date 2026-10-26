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
    .domain([-1, 11]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 11]);

  return (
    <Chart.ScatterPlot
      data={data}
      groupKey='x'
      valueKey='value'
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      showLegend
      legendProps={legendProps}
      showTooltip={false}
      patterns
      aria-label='Scatterplot chart'
    />
  );
};

const data = ScatterplotMockData.ThreeSetsWithValue;

const legendProps = {
  legendMap: Object.keys(data[0])
    .filter((name) => name !== 'x' && name !== 'value')
    .reduce<Record<string, { label: string }>>((acc, key, index) => {
      acc[key] = { label: `Dataset ${index + 1}` };

      return acc;
    }, {}),
};

export default Demo;
