import { Chart, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const formatXAxisValue = (value: any) =>
  formatDate(value, {
    month: 'short',
    day: 'numeric',
  });

const formatTooltipTitle = (value: any) =>
  formatDate(value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const legendProps = {
  legendMap: {
    line: { label: 'Line' },
  },
};

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Chart.Line
      groupKey='time'
      data={data}
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      axisXValueFormatter={formatXAxisValue}
      tooltipTitleFormatter={formatTooltipTitle}
      legendProps={legendProps}
      showDots
      aria-label='Line chart'
    />
  );
};

const data = LineMockData.Time;

export default Demo;
