import { Box } from '@semcore/ui/base-components';
import type { DonutChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

type BasicUsageProps = Omit<DonutChartProps, 'innerLabel'> & {
  innerLabel?: string;
  innerDescription?: string;
};

const Demo = (props: BasicUsageProps) => {
  const { plotWidth, plotHeight, innerLabel, innerDescription, ...chartProps } = getPropsToChart(props);

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.Donut
        {...chartProps}
        innerLabel={innerLabel || innerDescription ? [innerLabel ?? '', innerDescription ?? ''] : undefined}
        aria-label='Donut chart'
      />
    </Box>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};

const propsFromHelper = getChartProps<BasicUsageProps>({
  data,
  innerLabel: '71,240',
  innerDescription: 'Description',
});

// Remove showLegend from defaultProps to allow DonutChart's internal logic to work
// (auto-hide legend when data has only 1 item)
const { showLegend, ...defaultProps } = propsFromHelper as any;

export { defaultProps };

Demo.defaultProps = defaultProps;

export default Demo;
