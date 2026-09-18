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
 *  - `null`                -> rendered as `0`, not as `n/a`
 *
 * Each series is named after what its rounding demonstrates, so the tooltip can be read
 * as a checklist. Hover any point and compare the raw value below with what is shown:
 *
 *            | Jan 1                | Mar 15                | Jul 4
 * roundsDown | 1.739139   -> 1.7    | 3.14159    -> 3.1     | 9.8412    -> 9.8
 * roundsUp   | 7.899934   -> 7.9    | 4.449      -> 4.4     | 0.96      -> 1.0
 * halfway    | 2.55       -> 2.5    | 0.15       -> 0.1     | 8.25      -> 8.3
 * whole      | 6          -> 6      | 3          -> 3       | 5         -> 5
 * sparse     | 5          -> 5      | null       -> 0       | 7         -> 7
 *
 * `roundsUp` is the one that proves rounding rather than truncation: 7.899934 only
 * reaches 7.9 if the value is rounded, truncating would show 7.8.
 *
 * `halfway` shows the one rough edge: 2.55 and 0.15 are stored as binary values a hair
 * below the half, so `toFixed(1)` rounds them down while a reader expects 2.6 and 0.2.
 * 8.25 is stored just above and does round up.
 */
const data = [
  { time: new Date('2024-01-01T00:00:00Z'), roundsDown: 1.739139, roundsUp: 7.899934, halfway: 2.55, whole: 6, sparse: 5 },
  { time: new Date('2024-03-15T00:00:00Z'), roundsDown: 3.14159, roundsUp: 4.449, halfway: 0.15, whole: 3, sparse: null },
  { time: new Date('2024-07-04T00:00:00Z'), roundsDown: 9.8412, roundsUp: 0.96, halfway: 8.25, whole: 5, sparse: 7 },
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
