import type { HistogramChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps } from '../stories_props_helper';

const Demo = (props: HistogramChartProps) => {
  return (
    <Chart.Histogram
      {...props}
      alignItems='flex-start'
    />
  );
};

const data = [
  { category: 2, bar: 2.5 },
];

export const defaultProps = getChartProps<HistogramChartProps>({
  data,
  groupKey: 'x',
  plotHeight: 200,
  plotWidth: 300,
  showLegend: true,
});

Demo.defaultProps = defaultProps;

export default Demo;
