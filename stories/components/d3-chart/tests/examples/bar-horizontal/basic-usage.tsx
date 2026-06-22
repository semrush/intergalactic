import { Box } from '@semcore/ui/base-components';
import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';
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
        aria-label='CompactHorizontalBar chart'
      />
    </Box>
  );
};

const data = BarMockData.Default.map((d, i) => ({ ...d, category: `C.${i}` }));

export const defaultProps = getChartProps<BarChartProps>({
  groupKey: 'category',
  data,
  invertAxis: true,
});

Demo.defaultProps = defaultProps;

export default Demo;
