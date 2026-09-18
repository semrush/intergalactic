import { Chart } from '@semcore/ui/d3-chart';
import { scaleTime } from 'd3-scale';
import React from 'react';

const data = [
  { date: new Date(2024, 0, 7), traffic: 200, rounded: 300, zeroBaseline: 0 },
  { date: new Date(2024, 0, 14), traffic: 250, rounded: 301, zeroBaseline: 80 },
  { date: new Date(2024, 0, 21), traffic: 225, rounded: 404, zeroBaseline: 0 },
  { date: new Date(2024, 0, 28), traffic: 225, rounded: 455, zeroBaseline: 0 },
];

const PLOT_WIDTH = 500;

const xScale = scaleTime([data[0].date, data[data.length - 1].date], [40, PLOT_WIDTH - 30]);

const formatDate = (value: unknown) =>
  new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(value as Date);

const Demo = () => {
  return (
    <Chart.Line
      groupKey='date'
      data={data}
      plotWidth={PLOT_WIDTH}
      plotHeight={200}
      aria-label='Line chart with the default percentage delta'
      showDeltaPercentInTooltip
      xScale={xScale}
      xTicksCount={data.length}
      axisXValueFormatter={formatDate}
    />
  );
};

export default Demo;
