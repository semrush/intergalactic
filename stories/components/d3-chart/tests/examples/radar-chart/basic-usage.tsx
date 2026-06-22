import { Box } from '@semcore/ui/base-components';
import type { RadarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: RadarChartProps) => {
  const onClickHandler = () => {
    console.log('Clicked radar chart');
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
      <Chart.Radar
        {...chartProps}
        aria-label='Radar chart'
        onClickRadar={onClickHandler}
      />
    </Box>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

export const defaultProps = getChartProps<RadarChartProps>({
  data,
  groupKey: 'categories',
});

export default Demo;
