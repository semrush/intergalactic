import { Chart, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const Demo = () => {
  const MARGIN = 30;
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
      xTicksCount={5}
      yTicksCount={4}
      showDots
      showTooltip={false}
      patterns
      legendProps={legendProps}
      aria-label='Line chart'
    />
  );
};

const data = LineMockData.ThreeLines;

const legendProps = {
  legendMap: Object.keys(data[0])
    .filter((name) => name !== 'x')
    .reduce<Record<string, { label: string }>>((acc, key, index) => {
      acc[key] = { label: `Line ${index + 1}` };

      return acc;
    }, {}),
};

export default Demo;
