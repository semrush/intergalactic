import { Box } from '@semcore/ui/base-components';
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
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={500}
      h={200}
      overflow='auto'
    >
      <Chart.Area
        data={data}
        groupKey='time'
        tooltipValueFormatter={formatDate('tooltip')}
        axisXValueFormatter={formatDate('axis')}
        stacked={true}
        aria-label='Stacked area chart'
      />
    </Box>
  );
};

const data = StackedAreaMockData.Default;

export default Demo;
