import { Chart, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const legendProps = {
  legendMap: {
    y: { label: 'Line' },
  },
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
      curve={curveCardinal}
      legendProps={legendProps}
      aria-label='Line chart'
    />
  );
};

const data = LineMockData.Default;

export default Demo;
