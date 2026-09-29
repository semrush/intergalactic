import { Box } from '@semcore/ui/base-components';
import type { BarChartData, BarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * Edge cases of the tooltip percent delta, one per series, written as `[before, after]`.
 *
 * `before` is the baseline and carries no delta at all — there is no previous point.
 * `after` produces every case at once: hover it and read the tooltip top to bottom.
 */
const series = {
  overHundred: [1, 5], //          +400%     growth past 100%
  huge: [1, 100], //               +9,900%   grouped by locale — and does the column fit?
  fraction: [100, 100.5], //       +0.5%     one decimal place
  roundsToZero: [10000, 10004], // +0.04%    prints "0.0%", still upward
  shrank: [100, 50], //            50%       declines show no minus, only DiffDown
  droppedToZero: [100, 0], //      100%      a drop to zero, also downward
  fromZero: [0, 7], //             no diff   cannot divide by 0, cell stays empty
  zeroToZero: [0, 0], //           0%        stable
  unchanged: [50, 50], //          0%        stable
  negativeBase: [-10, -5], //      +50%      dividing by |prev| keeps growth green
};

const valuesAt = (index: 0 | 1) =>
  Object.fromEntries(Object.entries(series).map(([key, values]) => [key, values[index]]));

const data = [
  { point: 'before', ...valuesAt(0) },
  { point: 'after', ...valuesAt(1) },
];

/**
 * Overrides are typed against the chart's contract, not against this file's data: the
 * chart hands them its own `BarChartData`, whose values are `string | number | Date`, so
 * each one has to narrow to a number itself — exactly what a real consumer has to do.
 */
type DeltaOverride = NonNullable<BarChartProps['getPercentDelta']>;

const numberAt = (chartData: BarChartData, index: number, key: string) => {
  const value = chartData[index]?.[key];

  return typeof value === 'number' ? value : null;
};

/**
 * The one override worth a control: it shows what the chart does with a return value that
 * is valid yet unusable, which nothing in the `off` path can demonstrate.
 *
 * It is the built-in formula without its zero guard — the likeliest omission when someone
 * reimplements it. `NaN` and `Infinity` are both of type `number`, so neither TypeScript
 * nor the chart rejects them: on the second group `zeroToZero` (0 -> 0) yields `NaN` and
 * `fromZero` (0 -> 7) yields `Infinity`. The tooltip prints both verbatim, and `NaN` is
 * additionally classified as the `stable` trend, so it is greyed out as though nothing
 * had changed.
 */
const deltaOverrides = {
  divideByZero: (key, index, chartData) => {
    if (index === 0) return null;

    const prev = numberAt(chartData, index - 1, key);
    const curr = numberAt(chartData, index, key);

    if (prev === null || curr === null) return null;

    return ((curr - prev) / prev) * 100;
  },
} satisfies Record<string, DeltaOverride>;

type DeltaEdgeCasesStoryProps = BarChartProps & {
  /** `off` keeps the built-in calculation, the rest replace it — see `deltaOverrides`. */
  deltaOverride?: 'off' | keyof typeof deltaOverrides;
};

const Demo = (props: DeltaEdgeCasesStoryProps) => {
  const { plotWidth, plotHeight, deltaOverride, ...chartProps } =
    getPropsToChart<DeltaEdgeCasesStoryProps>(props);

  const getPercentDelta =
    deltaOverride && deltaOverride !== 'off' ? deltaOverrides[deltaOverride] : undefined;

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
        getPercentDelta={getPercentDelta}
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
  // Off by default: the browser tests screenshot and assert the built-in calculation
  // on this story, so the overrides stay opt-in from the Storybook panel.
  deltaOverride: 'off',
});

Demo.defaultProps = defaultProps;

export default Demo;
