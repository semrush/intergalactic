import { Box } from '@semcore/ui/base-components';
import type { AreaChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedAreaMockData from '../../../__mocks__/stacked-area';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

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

const Demo = (props: AreaChartProps) => {
  const { plotWidth, plotHeight, ...chartProps } = getPropsToChart(props);

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.Area
        {...chartProps}
        tooltipValueFormatter={formatDate('tooltip')}
        axisXValueFormatter={formatDate('axis')}
        aria-label='Stacked area chart'
      />
    </Box>
  );
};

const data = StackedAreaMockData.Default;

export const defaultProps = getChartProps<AreaChartProps>({
  data,
  groupKey: 'time',
  stacked: true,
});

Demo.defaultProps = defaultProps;

export default Demo;
