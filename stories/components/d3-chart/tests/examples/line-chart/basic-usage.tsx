import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: LineChartProps) => {
  const onClickHandler = () => {
    console.log('Clicked line chart');
  };
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
      <Chart.Line
        {...chartProps}
        aria-label='Line chart'
        onClickLine={onClickHandler}
      />
    </Box>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1: Math.abs(Math.sin(Math.exp(i))) * 10,
    line2: Math.abs(Math.cos(Math.exp(i))) * 10,
  }));

export const defaultProps = getChartProps<LineChartProps>({
  groupKey: 'x',
  data,
  showDots: true,
  showLegend: true,
});

Demo.defaultProps = defaultProps;

export default Demo;
