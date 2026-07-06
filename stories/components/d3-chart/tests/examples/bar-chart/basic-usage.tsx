import { Box } from '@semcore/ui/base-components';
import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

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
        aria-label='Bar chart'
      />
    </Box>
  );
};

const data = [
  { category: 'Category 0', bar: 2 },
  { category: 'Category 1', bar: 5 },
  { category: 'Category 2', bar: 7 },
  { category: 'Category 3', bar: 4 },
  { category: 'Category 4', bar: 8 },
];

export const defaultProps = getChartProps<BarChartProps>({
  groupKey: 'category',
  type: 'group',
  data,
  trend: {
    bar: [
      { x: 'Category 0' as string, y: 2 as number },
      { x: 'Category 1' as string, y: 5 as number },
      { x: 'Category 2' as string, y: 7 as number },
      { x: 'Category 3' as string, y: 4 as number },
      { x: 'Category 4' as string, y: 8 as number },
    ],
  },
} as any);

Demo.defaultProps = defaultProps;

export default Demo;
