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
      legendProps={legendProps}
      aria-label='Bar chart'
      patterns
    />
  );
};

const data = BarMockData.TwoBars;

const legendProps = {
  legendMap: Object.keys(data[0])
    .filter((name) => name !== 'category')
    .reduce<Record<string, { label: string }>>((acc, key) => {
      acc[key] = { label: `Bar ${key.replace('bar', '')}` };

      return acc;
    }, {}),
};

export default Demo;
