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
 * shrank         |    100 |     50 | 50%        — declines show no minus, only DiffDown
 * droppedToZero  |    100 |      0 | 100%       — a drop to zero, also downward
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
 * Variants for the `getPercentDelta` prop, which replaces the built-in delta calculation.
 *
 * Every variant honours the declared contract — each one is annotated `: number | null`
 * and TypeScript accepts it. What they show is what the chart does with returns that are
 * valid yet unusable, and where an override stops matching the built-in behaviour.
 *
 * variant            | what it demonstrates                        | hover
 * -------------------|---------------------------------------------|-------------
 * custom             | a correct override, for reference            | second group
 * divideByZero       | `NaN` and `Infinity` are valid numbers       | second group
 * includesFirstPoint | an override also runs for index 0            | FIRST group
 */
const deltaOverrides = {
  custom: (key: string, index: number, chartData: DeltaData[]): number | null => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key as keyof DeltaData];
    const curr = chartData[index]?.[key as keyof DeltaData];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },

  /**
   * The built-in formula written without the zero guard — the single most likely omission
   * when someone reimplements it. The return type is still satisfied, because `NaN` and
   * `Infinity` are both of type `number`, so neither TypeScript nor the chart rejects them.
   *
   * On the second group this dataset produces both: `zeroToZero` goes 0 -> 0, which is
   * `0 / 0` -> `NaN`, and `fromZero` goes 0 -> 7, which is `7 / 0` -> `Infinity`. The
   * tooltip prints them verbatim as `NaN%` and `Infinity%`, and `NaN` is additionally
   * classified as the `stable` trend, so it is greyed out as though nothing had changed.
   */
  divideByZero: (key: string, index: number, chartData: DeltaData[]): number | null => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key as keyof DeltaData];
    const curr = chartData[index]?.[key as keyof DeltaData];

    if (typeof prev !== 'number' || typeof curr !== 'number') return null;

    return ((curr - prev) / prev) * 100;
  },

  /**
   * The built-in formula without its first-point guard, to show that the guard is not
   * applied to overrides at all.
   *
   * The built-in path starts with `if (index === 0) return null`, but that line sits
   * *after* the custom branch, so an override is called with `index === 0` too. Comparing
   * the first point with itself yields a valid `0`, which is enough to make the difference
   * visible: hover the FIRST group and every series shows `0%`, where `off` renders no
   * delta column at all.
   *
   * On the second group this is identical to `off` by design — it is the same formula, and
   * with a two point dataset there is nothing else it could differ on. The first group is
   * the whole point of this variant.
   */
  includesFirstPoint: (key: string, index: number, chartData: DeltaData[]): number | null => {
    const previous = chartData[Math.max(index - 1, 0)]?.[key as keyof DeltaData];
    const curr = chartData[index]?.[key as keyof DeltaData];

    if (typeof previous !== 'number' || typeof curr !== 'number' || previous === 0) return null;

    return ((curr - previous) / Math.abs(previous)) * 100;
  },
};

type DeltaEdgeCasesStoryProps = BarChartProps & {
  /**
   * `off` keeps the built-in calculation, the rest replace it. See `deltaOverrides` for
   * what each one demonstrates and which bar group to hover.
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
