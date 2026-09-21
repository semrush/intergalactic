import { Box } from '@semcore/ui/base-components';
import type { AreaChartData, AreaChartProps } from '@semcore/ui/d3-chart';
import { BAD, Chart, DATA_TYPE, FORECAST, GOOD, HIGHLIGHT_DOT, INSIGHTFUL, POTENTIAL } from '@semcore/ui/d3-chart';
import { curveBasis, curveCardinal, curveLinear, curveMonotoneX, curveStep } from 'd3-shape';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * `tooltipValueFormatter` is applied to series values, not to the tooltip title, so it has
 * to format numbers. The title is always rendered by the built-in formatter, which prints
 * the `Date` group key as a date.
 */
function formatValue(value: any) {
  return `${value} clicks`;
}

/**
 * Curves are picked by name rather than passed as a factory: browser tests hand props to
 * the story as plain JSON through `loadPage`, so a function would not survive the trip.
 */
const curves = {
  linear: curveLinear,
  cardinal: curveCardinal,
  monotoneX: curveMonotoneX,
  step: curveStep,
  basis: curveBasis,
};

export type CurveName = keyof typeof curves;
export type HighlightDotsMode = 'none' | 'good' | 'bad' | 'insightful' | 'mixed';
export type DataTypeMode = 'none' | 'forecast' | 'potential' | 'both';

type AreaChartStoryProps = AreaChartProps & {
  /** Set to true to replace the built-in tooltip value formatter with `formatValue`. */
  useCustomValueFormatter?: boolean;
  /**
   * Swaps in a dataset where `line` drops to 0 in the middle.
   *
   * `getPercentDelta` cannot divide by a previous value of 0, so that series has no
   * delta on the next point while `line2` still has one. Together with
   * `showDeltaPercentInTooltip` this is the mixed row that no other dataset produces.
   */
  withZeroValue?: boolean;
  /** D3 curve factory, chosen by name — see `curves`. */
  curveName?: CurveName;
  /**
   * Marks data points with `HIGHLIGHT_DOT`, which makes `Dots` draw the dashed border ring
   * and the translucent halo around them.
   *
   * `insightful` resolves to the violet→green gradient instead of a flat token color, so it
   * is the only mode that exercises the `url(#dotGradient_*)` branch.
   */
  highlightDots?: HighlightDotsMode;
  /**
   * Appends points marked with `DATA_TYPE`, which `Area` pulls out of the main path and
   * renders as separate dashed + masked segments.
   */
  dataType?: DataTypeMode;
  /**
   * Drops `line2` so only one series is left.
   *
   * In non-stacked mode `AreaChart` turns the fill gradient on only when exactly one series
   * is checked, so with the default two-series dataset `withGradient` is always false and the
   * gradient cannot be seen without unchecking a legend item by hand.
   */
  singleSeries?: boolean;
};

/** Indices in the base dataset that each highlight mode marks. */
const highlightTargets: Record<Exclude<HighlightDotsMode, 'none'>, Array<[number, symbol]>> = {
  good: [[5, GOOD]],
  bad: [[6, BAD]],
  insightful: [[9, INSIGHTFUL]],
  mixed: [
    [5, GOOD],
    [6, BAD],
    [9, INSIGHTFUL],
  ],
};

/** Advances a group-key value by `step` ms, keeping `Date` and timestamp bases apart. */
function advanceGroupKey(value: unknown, step: number) {
  if (value instanceof Date) return new Date(value.getTime() + step);
  if (typeof value === 'number') return value + step;
  return value;
}

/**
 * Reshapes the incoming dataset according to the data-level knobs.
 *
 * Deliberately generic: browser tests feed this story their own `data` through `loadPage`,
 * so points are spread rather than rebuilt from known keys, and tail points are derived
 * from the last real point instead of being hardcoded.
 *
 * Each tail starts by repeating the point it branches off from — otherwise the extra
 * segment renders detached from the main area, the same trick the shared area mocks use.
 */
function buildData({
  base,
  groupKey,
  singleSeries,
  highlightDots,
  dataType,
}: {
  base: readonly any[];
  groupKey: string;
  singleSeries?: boolean;
  highlightDots?: HighlightDotsMode;
  dataType?: DataTypeMode;
}): AreaChartData {
  const points: any[] = base.map((point) => {
    const copy = { ...point };
    if (singleSeries) delete copy.line2;
    return copy;
  });

  if (highlightDots && highlightDots !== 'none') {
    highlightTargets[highlightDots].forEach(([index, highlight]) => {
      if (points[index]) {
        points[index] = { ...points[index], [HIGHLIGHT_DOT]: highlight };
      }
    });
  }

  if (!dataType || dataType === 'none' || points.length === 0) return points as AreaChartData;

  // Reuse the spacing of the real data so the tail keeps the same tick rhythm.
  const first = points[0]?.[groupKey];
  const last = points[points.length - 1]?.[groupKey];
  const toMs = (v: unknown) => (v instanceof Date ? v.getTime() : typeof v === 'number' ? v : 0);
  const step =
    points.length > 1 ? (toMs(last) - toMs(first)) / (points.length - 1) : 5 * 24 * 60 * 60 * 1000;

  const withTail = (marker: typeof FORECAST | typeof POTENTIAL, bumps: number[]) => {
    const branchPoint = points[points.length - 1];
    points.push({ ...branchPoint, [DATA_TYPE]: marker });

    bumps.forEach((bump, i) => {
      const next: any = { ...branchPoint, [DATA_TYPE]: marker };
      next[groupKey] = advanceGroupKey(branchPoint[groupKey], step * (i + 1));
      Object.keys(branchPoint).forEach((key) => {
        if (key === groupKey) return;
        const value = branchPoint[key];
        if (typeof value === 'number') next[key] = Math.round(value * bump * 10) / 10;
      });
      points.push(next);
    });
  };

  if (dataType === 'forecast' || dataType === 'both') {
    withTail(FORECAST, [1.2, 1.1]);
  }

  if (dataType === 'potential' || dataType === 'both') {
    withTail(POTENTIAL, [1.4, 1.6]);
  }

  return points as AreaChartData;
}

const Demo = (props: AreaChartStoryProps) => {
  const {
    plotWidth,
    plotHeight,
    useCustomValueFormatter,
    withZeroValue,
    curveName,
    highlightDots,
    dataType,
    singleSeries,
    ...chartProps
  } = getPropsToChart(props);
  // `data` stays inside chartProps so a caller-supplied dataset (browser tests pass one
  // through `loadPage`) is what the knobs reshape, instead of being replaced by it.
  const chartData = React.useMemo(
    () =>
      buildData({
        base: withZeroValue ? dataWithZeroValue : ((chartProps as AreaChartProps).data ?? data),
        groupKey: (chartProps as AreaChartProps).groupKey ?? 'time',
        singleSeries,
        highlightDots,
        dataType,
      }),
    [(chartProps as AreaChartProps).data, (chartProps as AreaChartProps).groupKey, withZeroValue, singleSeries, highlightDots, dataType],
  );

  // Declared after `chartData` so the logged item is the point that was actually rendered,
  // not the one at that index in the untouched default dataset.
  const onClickHandler = (index: number, event: React.SyntheticEvent) => {
    const clickedItem = chartData[index];
    console.log('Clicked area chart point:');
    console.log('→ Index:', index);
    console.log('→ Data item:', clickedItem);
    console.log('→ Event:', event);
  };

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
        data-testid='TEST'
        {...(chartProps as AreaChartProps)}
        aria-label='Area chart'
        data={chartData}
        {...(curveName ? { curve: curves[curveName as CurveName] } : {})}
        {...(useCustomValueFormatter ? { tooltipValueFormatter: formatValue } : {})}
        onClickArea={onClickHandler}
      />
    </Box>
  );
};

const data = [
  { time: new Date('2024-01-01'), line: 2, line2: 3 },
  { time: new Date('2024-01-06'), line: 4, line2: 3 },
  { time: new Date('2024-01-11'), line: 3, line2: 3 },
  { time: new Date('2024-01-16'), line: 6, line2: 4 },
  { time: new Date('2024-01-21'), line: 5, line2: 3 },
  { time: new Date('2024-01-26'), line: 7, line2: 5 },
  { time: new Date('2024-01-31'), line: 6, line2: 2 },
  { time: new Date('2024-02-05'), line: 8, line2: 5 },
  { time: new Date('2024-02-10'), line: 9, line2: 7 },
  { time: new Date('2024-02-15'), line: 10, line2: 8 },
];

/**
 * Same shape as `data`, but `line` sits at 0 on Jan 11.
 *
 * Hovering Jan 16 then gives `line` no delta (its previous value is 0) while `line2`
 * still has one, so the tooltip switches to three columns and the `line` row only fills
 * two of them.
 */
const dataWithZeroValue = [
  { time: new Date('2024-01-01'), line: 2, line2: 3 },
  { time: new Date('2024-01-06'), line: 4, line2: 3 },
  { time: new Date('2024-01-11'), line: 0, line2: 3 },
  { time: new Date('2024-01-16'), line: 6, line2: 4 },
  { time: new Date('2024-01-21'), line: 5, line2: 3 },
  { time: new Date('2024-01-26'), line: 7, line2: 5 },
  { time: new Date('2024-01-31'), line: 6, line2: 2 },
  { time: new Date('2024-02-05'), line: 8, line2: 5 },
  { time: new Date('2024-02-10'), line: 9, line2: 7 },
  { time: new Date('2024-02-15'), line: 10, line2: 8 },
];

export const defaultProps = getChartProps<AreaChartStoryProps>({
  showDots: true,
  // Mirrors the component default. `stacked` is deprecated and always true by default, so
  // the story has to render that path unless the control is flipped off.
  stacked: true,
  patterns: false,
  groupKey: 'time',
  data,
  // Off by default: the tooltip then shows the date in the title and plain numbers in the
  // values, which is what the built-in formatter does.
  useCustomValueFormatter: false,
  withZeroValue: false,
  curveName: 'linear',
  highlightDots: 'none',
  dataType: 'none',
  singleSeries: false,
});

Demo.defaultProps = defaultProps;

export default Demo;
