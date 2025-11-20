import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: BarChartProps) => {
  return (
    <Chart.Bar
      {...getPropsToChart(props)}
      aria-label='Bar chart'
    />
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
      { x: 'Category 0', y: 2 },
      { x: 'Category 1', y: 5 },
      { x: 'Category 2', y: 7 },
      { x: 'Category 3', y: 4 },
      { x: 'Category 4', y: 8 },
    ],
  },
});

Demo.defaultProps = defaultProps;

export default Demo;
