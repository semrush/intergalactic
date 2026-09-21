import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { BAD, Chart, DATA_TYPE, FORECAST, GOOD, HIGHLIGHT_DOT, INSIGHTFUL, POTENTIAL } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

export type HighlightDotsMode = 'none' | 'good' | 'bad' | 'insightful' | 'mixed';
export type DataTypeMode = 'none' | 'forecast' | 'potential' | 'both';

type LineChartStoryProps = LineChartProps & {
  useExplicitPlotWidth?: boolean;
  /**
   * Marks points with `HIGHLIGHT_DOT`, the same data-level marker `AreaChart` uses.
   *
   * `Dots` is shared between Area, Line and Radar, so Line renders the ring and the halo
   * too — but only while the dot itself is visible. `LineChart` passes `display={showDots}`
   * with no fallback, so turning `showDots` off hides the highlight as well, while
   * `AreaChart` keeps it. Flip both controls to see the two charts disagree.
   */
  highlightDots?: HighlightDotsMode;
  /**
   * Appends points marked with `DATA_TYPE`, which `Line` pulls out of the main path and
   * renders as separate segments: `forecast` as a dashed line in the series color,
   * `potential` as a dashed line filled with the violet→green gradient.
   */
  dataType?: DataTypeMode;
  /**
   * Which `tooltipTitleFormatter` to pass, or `off` to keep the built-in title.
   *
   * The variants label the bare index, because that is what this story's group key is.
   * Date-shaped titles are not demonstrated here on purpose — `tooltip-default-format.tsx`
   * is the story for those, and it is Date-keyed to begin with.
   */
  titleFormat?: 'off' | keyof typeof titleFormats;
  /**
   * Which `getPercentDelta` override to pass, or `off` to keep the built-in calculation.
   *
   * Needs `showDeltaPercentInTooltip` to be on to show up at all. See `deltaOverrides`
   * for what each variant demonstrates.
   */
  deltaOverride?: 'off' | keyof typeof deltaOverrides;
};

/** Indices in the generated dataset that each mode marks. */
const highlightTargets: Record<Exclude<HighlightDotsMode, 'none'>, Array<[number, symbol]>> = {
  good: [[4, GOOD]],
  bad: [[9, BAD]],
  insightful: [[14, INSIGHTFUL]],
  mixed: [
    [4, GOOD],
    [9, BAD],
    [14, INSIGHTFUL],
  ],
};

/**
 * Variants for `tooltipTitleFormatter`, which formats the tooltip title only and leaves the
 * series values to `tooltipValueFormatter`.
 *
 * `tooltipTitleFormatter` receives the raw `groupKey` value, so the variants have to suit
 * the key this story actually uses — a bare index 0..19. `off` keeps the built-in title,
 * which sends a number through `Intl.NumberFormat` and so prints just "5"; labelling that
 * index is the thing a product reaches for the prop to do.
 *
 * Passed as names rather than as formatter functions: browser tests hand props to the story
 * as plain JSON through `loadPage`, so a function would not survive the trip.
 */
const titleFormats = {
  point: (value: unknown) => `Point ${value}`,
  week: (value: unknown) => `Week ${value}`,
  padded: (value: unknown) => `#${String(value).padStart(2, '0')}`,
} as const;

/**
 * Variants for `getPercentDelta`, which replaces the built-in delta calculation.
 *
 * Every variant honours the declared `number | null` contract — what they show is what the
 * chart does with returns that are valid yet unusable, and where an override stops matching
 * the built-in behaviour.
 *
 * variant            | what it demonstrates
 * -------------------|------------------------------------------------------------
 * custom             | a correct override, for reference
 * divideByZero       | the built-in formula without its zero guard — `NaN`/`Infinity`
 *                    | are valid `number`s, so they reach the tooltip verbatim
 * includesFirstPoint | an override also runs for index 0, unlike the built-in path
 */
const deltaOverrides = {
  custom: (key: string, index: number, chartData: any[]): number | null => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key];
    const curr = chartData[index]?.[key];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },

  divideByZero: (key: string, index: number, chartData: any[]): number | null => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key];
    const curr = chartData[index]?.[key];

    if (typeof prev !== 'number' || typeof curr !== 'number') return null;

    return ((curr - prev) / prev) * 100;
  },

  includesFirstPoint: (key: string, index: number, chartData: any[]): number | null => {
    const prev = chartData[Math.max(index - 1, 0)]?.[key];
    const curr = chartData[index]?.[key];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },
};

/** Advances a group-key value by `step`, keeping `Date` and numeric bases apart. */
function advanceGroupKey(value: unknown, step: number) {
  if (value instanceof Date) return new Date(value.getTime() + step);
  if (typeof value === 'number') return value + step;
  return value;
}

/**
 * Appends the `DATA_TYPE` tails.
 *
 * Each tail starts by repeating the point it branches off from — otherwise the extra
 * segment renders detached from the main line, the same trick the area story uses.
 */
function withDataTypeTails(points: any[], groupKey: string, mode?: DataTypeMode) {
  if (!mode || mode === 'none' || points.length === 0) return points;

  const result = [...points];
  const first = result[0]?.[groupKey];
  const last = result[result.length - 1]?.[groupKey];
  const toMs = (v: unknown) => (v instanceof Date ? v.getTime() : typeof v === 'number' ? v : 0);
  // Reuse the spacing of the real data so the tail keeps the same tick rhythm.
  const step = result.length > 1 ? (toMs(last) - toMs(first)) / (result.length - 1) : 1;

  const withTail = (marker: typeof FORECAST | typeof POTENTIAL, bumps: number[]) => {
    const branchPoint = result[result.length - 1];
    result.push({ ...branchPoint, [DATA_TYPE]: marker });

    bumps.forEach((bump, i) => {
      const next: any = { ...branchPoint, [DATA_TYPE]: marker };
      next[groupKey] = advanceGroupKey(branchPoint[groupKey], step * (i + 1));
      Object.keys(branchPoint).forEach((key) => {
        if (key === groupKey) return;
        const value = branchPoint[key];
        if (typeof value === 'number') next[key] = Math.round(value * bump * 10) / 10;
      });
      result.push(next);
    });
  };

  if (mode === 'forecast' || mode === 'both') withTail(FORECAST, [1.2, 1.1]);
  if (mode === 'potential' || mode === 'both') withTail(POTENTIAL, [1.4, 1.6]);

  return result;
}

function withHighlights(base: readonly any[], mode?: HighlightDotsMode): any[] {
  if (!mode || mode === 'none') return [...base];
  const points = base.map((point) => ({ ...point }));
  highlightTargets[mode].forEach(([index, highlight]) => {
    if (points[index]) points[index] = { ...points[index], [HIGHLIGHT_DOT]: highlight };
  });
  return points;
}

const Demo = (props: LineChartStoryProps) => {
  const [measuredSize, setMeasuredSize] = React.useState<[number, number] | null>(null);
  const onClickHandler = () => {
    console.log('Clicked line chart');
  };
  const {
    aspect,
    hMax,
    hMin,
    onResize,
    plotWidth,
    plotHeight,
    useExplicitPlotWidth,
    highlightDots,
    dataType,
    titleFormat,
    deltaOverride,
    ...chartProps
  } = getPropsToChart(props);

  // A caller-supplied dataset (browser tests pass one through `loadPage`) wins over the
  // built-in one, so the knobs reshape what was handed in rather than replacing it.
  const suppliedData = (chartProps as LineChartProps).data;
  const groupKey = (chartProps as LineChartProps).groupKey ?? 'x';

  const chartData = React.useMemo(
    () => withDataTypeTails(withHighlights(suppliedData ?? data, highlightDots), groupKey, dataType),
    [suppliedData, highlightDots, dataType, groupKey],
  );

  const handleResize: NonNullable<LineChartProps['onResize']> = (size, entries) => {
    setMeasuredSize(size);
    onResize?.(size, entries);
  };

  const tooltipTitleFormatter =
    titleFormat && titleFormat !== 'off'
      ? titleFormats[titleFormat as keyof typeof titleFormats]
      : undefined;

  const getPercentDelta =
    deltaOverride && deltaOverride !== 'off'
      ? deltaOverrides[deltaOverride as keyof typeof deltaOverrides]
      : undefined;

  const responsiveChartProps: LineChartProps = {
    ...(chartProps as LineChartProps),
    groupKey,
    data: chartData,
    aspect,
    hMax,
    hMin,
    onResize: handleResize,
    ...(useExplicitPlotWidth ? { plotWidth } : {}),
    ...(tooltipTitleFormatter ? { tooltipTitleFormatter } : {}),
    ...(getPercentDelta ? { getPercentDelta } : {}),
  };

  const showResponsiveInfo = aspect || hMin || hMax || useExplicitPlotWidth;

  return (
    <>
      <Box
        border='1px solid #ddd'
        borderRadius='surface-rounded'
        resize='both'
        w={plotWidth}
        h={plotHeight}
        overflow='auto'
      >
        <Chart.Line
          {...responsiveChartProps}
          aria-label='Line chart'
          onClickLine={onClickHandler}
        />
      </Box>
      {showResponsiveInfo && (
        <Box mt={2} data-testid='responsive-size'>
          Measured plot size: {measuredSize ? `${Math.round(measuredSize[0])} x ${Math.round(measuredSize[1])}` : 'not measured yet'}
        </Box>
      )}
    </>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1: Math.abs(Math.sin(Math.exp(i))) * 10,
    line2: Math.abs(Math.cos(Math.exp(i))) * 10,
  }));

export const defaultProps = getChartProps<LineChartStoryProps>({
  groupKey: 'x',
  data,
  showDots: true,
  showLegend: true,
  useExplicitPlotWidth: false,
  highlightDots: 'none',
  dataType: 'none',
  titleFormat: 'off',
  deltaOverride: 'off',
});

Demo.defaultProps = defaultProps;

export default Demo;
