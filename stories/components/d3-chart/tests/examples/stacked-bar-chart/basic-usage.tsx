import { Box } from '@semcore/ui/base-components';
import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedBarMockData from '../../../__mocks__/stacked-bar';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: BarChartProps) => {
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
      <Chart.Bar
        {...chartProps}
        aria-label='Stacked bar chart'
      />
    </Box>
  );
};

const data = StackedBarMockData.Default;

export const defaultProps = getChartProps<BarChartProps>({
  groupKey: 'bar',
  data,
  type: 'stack',
});

Demo.defaultProps = defaultProps;

export default Demo;
