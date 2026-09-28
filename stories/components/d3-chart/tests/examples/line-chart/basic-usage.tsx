import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import dataPipeline, {
  base as baseData,
  type DataTypeMode,
  type HighlightDotsMode,
} from './__mocks__';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

export type { DataTypeMode, HighlightDotsMode };

type LineChartStoryProps = LineChartProps & {
  useExplicitPlotWidth?: boolean;
  highlightDots?: HighlightDotsMode;
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
  withInterpolatedGaps?: boolean;
};

/**
 * Variants for `tooltipTitleFormatter`, which formats the tooltip title only and leaves the
 * series values to `tooltipValueFormatter`.
 *
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
  custom: (key: string, index: number, chartData: LineChartProps['data']): number | null => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key];
    const curr = chartData[index]?.[key];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },

  divideByZero: (key: string, index: number, chartData: LineChartProps['data']): number | null => {
    if (index === 0) return null;

    const prev = chartData[index - 1]?.[key];
    const curr = chartData[index]?.[key];

    if (typeof prev !== 'number' || typeof curr !== 'number') return null;

    return ((curr - prev) / prev) * 100;
  },

  includesFirstPoint: (key: string, index: number, chartData: LineChartProps['data']): number | null => {
    const prev = chartData[Math.max(index - 1, 0)]?.[key];
    const curr = chartData[index]?.[key];

    if (typeof prev !== 'number' || typeof curr !== 'number' || prev === 0) return null;

    return ((curr - prev) / Math.abs(prev)) * 100;
  },
};

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
    withInterpolatedGaps,
    ...chartProps
  } = getPropsToChart(props);

  // A caller-supplied dataset (browser tests pass one through `loadPage`) wins over the
  // built-in one, so the knobs reshape what was handed in rather than replacing it.
  const suppliedData = (chartProps as LineChartProps).data;
  const groupKey = (chartProps as LineChartProps).groupKey ?? 'x';

  const chartData = React.useMemo(
    () =>
      dataPipeline(
        { highlightDots, withInterpolatedGaps, dataType },
        suppliedData ?? baseData,
      ),
    [suppliedData, highlightDots, withInterpolatedGaps, dataType],
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

export const defaultProps = getChartProps<LineChartStoryProps>({
  groupKey: 'x',
  data: baseData,
  showDots: true,
  showLegend: true,
  useExplicitPlotWidth: false,
  highlightDots: 'none',
  dataType: 'none',
  withInterpolatedGaps: false,
  titleFormat: 'off',
  deltaOverride: 'off',
});

Demo.defaultProps = defaultProps;

export default Demo;
