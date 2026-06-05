import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedAreaMockData from '../../../__mocks__/stacked-area';

const formatDate = (type: 'axis' | 'tooltip') => (value: any) => {
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

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey='time'
      tooltipValueFormatter={formatDate('tooltip')}
      axisXValueFormatter={formatDate('axis')}
      stacked={true}
      aria-label='Stacked area chart'
    />
  );
};

const data = StackedAreaMockData.Default;

export default Demo;
