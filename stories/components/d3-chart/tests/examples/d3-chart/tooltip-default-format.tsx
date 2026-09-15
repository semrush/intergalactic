import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * Deliberately does NOT pass `tooltipValueFormatter`, so the chart falls back to
 * `AbstractChart.defaultTooltipFormatter`:
 *  - `groupKey` is a Date  -> formatted through `Intl.DateTimeFormat(locale, ...)`
 *  - integer values        -> rendered as is
 *  - fractional values     -> rounded to one decimal place
 *  - `null` / missing      -> rendered as `n/a`
 */
const data = [
  { time: new Date('2024-01-01T00:00:00Z'), integer: 10, fractional: 1234.5678, sparse: 5 },
  { time: new Date('2024-03-15T00:00:00Z'), integer: 20, fractional: 0.049, sparse: null },
  { time: new Date('2024-07-04T00:00:00Z'), integer: 30, fractional: 99.95, sparse: 7 },
];

const Demo = (props: LineChartProps) => {
  const { plotWidth, plotHeight, ...chartProps } = getPropsToChart(props) as any;

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
        aria-label='Line chart with default tooltip formatting'
      />
    </Box>
  );
};

export const defaultProps = getChartProps<LineChartProps>({
  groupKey: 'time',
  data,
  showDots: true,
  showLegend: true,
  showTotalInTooltip: false,
  duration: 0,
} as LineChartProps);

Demo.defaultProps = defaultProps;

export default Demo;
