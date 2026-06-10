import { Box } from '@semcore/ui/base-components';
import type { HistogramChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: HistogramChartProps) => {
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
      <Chart.Histogram
        {...chartProps}
        alignItems='flex-start'
      />
    </Box>
  );
};

const data = [
  { category: 1, bar: 1, bar1: 0.5 },
  { category: 2, bar: 2.5, bar1: 4 },
  { category: 3, bar: 3, bar1: 2 },
];

export const defaultProps = getChartProps<HistogramChartProps>({
  data,
  groupKey: 'category',
  plotHeight: 200,
  plotWidth: 300,
  showLegend: true,
});

Demo.defaultProps = defaultProps;

export default Demo;
