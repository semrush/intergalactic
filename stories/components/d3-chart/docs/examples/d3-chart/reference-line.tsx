import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

const data = LineMockData.Months;

const monthCenter = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 15);

const valueFormatter = (value: unknown) => {
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value / 1000}K`;
  }

  return null;
};

const Demo = () => {
  const MARGIN = { top: 28, right: 0, bottom: 32, left: 46 };
  const width = 500;
  const height = 220;
  const plotWidth = width - MARGIN.left - MARGIN.right;
  const monthWidth = plotWidth / data.length;
  const lastMonth = data[data.length - 1].time;

  const xScale = scaleTime()
    .range([MARGIN.left, width - MARGIN.right])
    .domain([data[0].time, lastMonth]);

  const yScale = scaleLinear()
    .range([height - MARGIN.bottom, MARGIN.top])
    .domain([0, 30000]);

  return (
    <Chart.Line
      data={data}
      plotWidth={width}
      plotHeight={height}
      xScale={xScale}
      yScale={yScale}
      yTicksCount={4}
      groupKey='time'
      aria-label='Line chart'
      axisYValueFormatter={valueFormatter}
      referenceLine={[
        { value: monthCenter(data[0].time) },
        { value: monthCenter(data[1].time), area: monthWidth },
      ]}
      referenceArea={{ value: [data[3].time, data[4].time], use: 'good', title: 'Wow!', subTitle: '+10%' }}
    />
  );
};

export default Demo;
