import { Box } from '@semcore/ui/base-components';
import type { AreaChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import StackedAreaMockData from '../../../__mocks__/stacked-area';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * Only the X axis carries dates. The tooltip title is rendered by the built-in formatter
 * from the `Date` group key, and the tooltip *values* are the numbers of each stack, so
 * `tooltipValueFormatter` must never be handed a date formatter: `Intl.DateTimeFormat`
 * reads a plain number as a millisecond timestamp and turns every value into
 * "January 1, 1970".
 */
const formatAxisDate = (value: any) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(value);

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
        axisXValueFormatter={formatAxisDate}
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
