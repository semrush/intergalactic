import { Box } from '@semcore/ui/base-components';
import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * Edge cases of the tooltip percent delta, one per series.
 *
 * Only two points: `before` is the baseline and carries no delta at all (there is no
 * previous point), `after` produces every case at once. Hover `after` and read the
 * tooltip top to bottom.
 *
 * series         | before | after  | expected diff
 * ---------------|--------|--------|------------------------------------------------
 * overHundred    |      1 |      5 | +400%      — growth past 100%
 * huge           |      1 |    100 | +9900%     — does the column still fit?
 * fraction       |    100 |  100.5 | +0.5%      — one decimal place
 * roundsToZero   |  10000 |  10004 | +0.04% rounds to 0 -> shown as a stable "0"
 * shrank         |    100 |     50 | -50%
 * droppedToZero  |    100 |      0 | -100%
 * fromZero       |      0 |      7 | no diff    — cannot divide by 0, cell stays empty
 * zeroToZero     |      0 |      0 | 0          — stable
 * unchanged      |     50 |     50 | 0          — stable
 * negativeBase   |    -10 |     -5 | -50%       — value grew, but the sign flips it red
 *
 * Three rows are worth a decision:
 *  - `roundsToZero` turns a real change into "no change" once it rounds below 0.05%;
 *  - `negativeBase` reads as a decline although -10 -> -5 is an improvement, because the
 *    formula divides by a negative baseline;
 *  - `fromZero` has no diff cell at all, and since the tooltip is a three column grid the
 *    rows below it shift one cell to the left. Everything from `zeroToZero` down is
 *    misaligned, which is the clearest way to see that defect by eye.
 */
const data = [
  {
    point: 'before',
    overHundred: 1,
    huge: 1,
    fraction: 100,
    roundsToZero: 10000,
    shrank: 100,
    droppedToZero: 100,
    fromZero: 0,
    zeroToZero: 0,
    unchanged: 50,
    negativeBase: -10,
  },
  {
    point: 'after',
    overHundred: 5,
    huge: 100,
    fraction: 100.5,
    roundsToZero: 10004,
    shrank: 50,
    droppedToZero: 0,
    fromZero: 7,
    zeroToZero: 0,
    unchanged: 50,
    negativeBase: -5,
  },
];

const Demo = (props: BarChartProps) => {
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
      <Chart.Bar
        {...chartProps}
        aria-label='Bar chart with percent delta edge cases'
      />
    </Box>
  );
};

export const defaultProps = getChartProps<BarChartProps>({
  groupKey: 'point',
  data,
  showDeltaPercentInTooltip: true,
  showTotalInTooltip: false,
  showLegend: false,
  duration: 0,
} as BarChartProps);

Demo.defaultProps = defaultProps;

export default Demo;
