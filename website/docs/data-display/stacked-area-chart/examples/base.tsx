import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';
import { curveCardinal } from 'd3-shape';

const formatDate = (type: 'axis' | 'tooltip') => (value) => {
  const options =
    type === 'axis'
      ? {
          month: 'short' as const,
          day: 'numeric' as const,
        }
      : {
          year: 'numeric' as const,
          month: 'long' as const,
          day: 'numeric' as const,
        };

  return new Intl.DateTimeFormat('en', options).format(value);
};

export default () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={300}
      groupKey={'time'}
      tooltipValueFormatter={formatDate('tooltip')}
      axisXValueFormatter={formatDate('axis')}
      stacked={true}
      curve={curveCardinal}
    />
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));
