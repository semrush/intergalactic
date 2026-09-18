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
 * roundsToZero   |  10000 |  10004 | +0.04% rounds to 0 -> shown as a stable "0%"
 * shrank         |    100 |     50 | -50%
 * droppedToZero  |    100 |      0 | -100%
 * fromZero       |      0 |      7 | no diff    — cannot divide by 0, cell stays empty
 * zeroToZero     |      0 |      0 | 0%         — stable
 * unchanged      |     50 |     50 | 0%         — stable
 * negativeBase   |    -10 |     -5 | +50%       — dividing by |prev| keeps growth green
 *
 * Two rows are worth a decision:
 *  - `roundsToZero` turns a real change into "no change" once it rounds below 0.05%;
 *  - `fromZero` carries no percentage, because there is nothing to divide by. Its cell is
 *    still rendered, just empty, which is what keeps the three column grid aligned —
 *    every row below it has to start its own line.
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

type DeltaData = (typeof data)[number];

/**
 * Percent changes as a backend would hand them over: only the series it managed to
 * compute. Everything else is simply absent from the response.
 */
const deltasFromApi: Record<string, number> = {
  overHundred: 400,
  huge: 9900,
  fraction: 0.5,
};

/**
 * Variants for the `getPercentDelta` prop, which replaces the built-in delta calculation.
 *
 * `custom` is what a correct override looks like: every path ends in a number or `null`.
 *
 * The other three all end up returning `undefined`, which is neither a number nor `null`.
 * `AbstractChart.getPercentDelta` only guards against `null`
 * (`if (customDelta === null) return null`) before calling `customDelta.toFixed(1)`, so the
 * chart throws `TypeError: Cannot read properties of undefined (reading 'toFixed')` while
 * rendering the tooltip. The chart itself mounts fine — it breaks on hover. And because the
 * deltas for every series are computed in one pass, a single missing value takes down the
 * whole tooltip, not just its own row.
 *
 * Each variant reaches `undefined` the way real product code does:
 *
 * variant          | how `undefined` appears              | hover to reproduce
 * -----------------|--------------------------------------|-------------------
 * returnsUndefined | function falls off the end           | second group
 * apiLookup        | key missing from the response        | second group
 * mirrorsBuiltIn   | bare `return` on the first point     | FIRST group
 */
const deltaOverrides = {
  custom: (key: string, index: number, chartData: DeltaData[]) => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key as keyof DeltaData];
    const curr = chartData[index]?.[key as keyof DeltaData];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },

  returnsUndefined: (key: string, index: number, chartData: DeltaData[]) => {
    // Only one series is handled; every other one falls through and yields `undefined`.
    if (key === 'overHundred') {
      const prev = chartData[index - 1]?.[key as keyof DeltaData] as number;
      const curr = chartData[index]?.[key as keyof DeltaData] as number;

      return ((curr - prev) / prev) * 100;
    }
  },

  /**
   * The delta is computed server side and the chart only looks it up. This is the most
   * common reason to override the calculation at all, and the shortest way to the bug:
   * indexing an object returns `undefined` for a missing key, never `null`. A series the
   * backend skipped — a metric added last week, a period still being recalculated — is
   * enough. The same happens with `.find()`, `Map.get()` and an out-of-range index.
   */
  apiLookup: (key: string) => deltasFromApi[key],

  /**
   * A copy of the built-in formula, written on the assumption that the chart filters the
   * first point out on its own — as the built-in path does with `if (index === 0) return
   * null`. It does not: that guard sits *after* the custom branch, so the override is
   * called with `index === 0` too. `chartData[-1]` is `undefined`, the early exit is a bare
   * `return`, and the very first point of the chart throws. Hover the FIRST group.
   */
  mirrorsBuiltIn: (key: string, index: number, chartData: DeltaData[]) => {
    const previous = chartData[index - 1];

    if (!previous) return;

    const prev = previous[key as keyof DeltaData];
    const curr = chartData[index]?.[key as keyof DeltaData];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },
};

type DeltaEdgeCasesStoryProps = BarChartProps & {
  /**
   * `off` keeps the built-in calculation. `custom` replaces it with a correct override.
   * `returnsUndefined` reproduces the crash described above: pick it, then hover the
   * second bar group.
   */
  deltaOverride?: 'off' | keyof typeof deltaOverrides;
};

const Demo = (props: DeltaEdgeCasesStoryProps) => {
  const { plotWidth, plotHeight, deltaOverride, ...chartProps } = getPropsToChart(props) as any;

  const getPercentDelta =
    deltaOverride && deltaOverride !== 'off'
      ? deltaOverrides[deltaOverride as keyof typeof deltaOverrides]
      : undefined;

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
        {...(getPercentDelta ? { getPercentDelta } : {})}
      />
    </Box>
  );
};

export const defaultProps = getChartProps<DeltaEdgeCasesStoryProps>({
  groupKey: 'point',
  data,
  showDeltaPercentInTooltip: true,
  showTotalInTooltip: false,
  showLegend: false,
  duration: 0,
  // Off by default: the browser tests screenshot and assert this story, and the
  // `returnsUndefined` variant deliberately throws.
  deltaOverride: 'off',
} as DeltaEdgeCasesStoryProps);

Demo.defaultProps = defaultProps;

export default Demo;
