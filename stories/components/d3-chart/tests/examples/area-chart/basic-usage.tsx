import { Box } from '@semcore/ui/base-components';
import type { AreaChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import { curveBasis, curveCardinal, curveLinear, curveMonotoneX, curveStep } from 'd3-shape';
import React from 'react';

import dataPipeline, { base as baseData } from './__mocks__';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

/**
 * `tooltipValueFormatter` is applied to series values, not to the tooltip title, so it has
 * to format numbers. The title is always rendered by the built-in formatter, which prints
 * the `Date` group key as a date.
 */
function formatValue(value: unknown) {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return `${value} clicks`;
  }

  return String(value);
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

type AreaChartStoryProps = Omit<AreaChartProps, 'patterns'> & {
  patterns?: AreaChartProps['patterns'] | false;
  /** Set to true to replace the built-in tooltip value formatter with `formatValue`. */
  useCustomValueFormatter?: boolean;
  /**
   * Swaps in a dataset where `line` drops to 0 in the middle.
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
   * Replaces three mid-run values with `interpolateValue`, so the chart bridges the gap
   * instead of breaking the line.
   */
  withInterpolatedGaps?: boolean;
  /**
   * Drops `line2` so only one series is left.
   */
  singleSeries?: boolean;
};

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
    withInterpolatedGaps,
    data,
    ...chartProps
  } = getPropsToChart(props);

  const chartData = dataPipeline(
    {
      withZeroValue,
      withSingleSeries: singleSeries,
      highlightDots,
      dataType,
      withInterpolatedGaps,
    },
    data,
  );

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

export const defaultProps = getChartProps<AreaChartStoryProps>({
  showDots: true,
  // Mirrors the component default. `stacked` is deprecated and always true by default
  stacked: true,
  patterns: false,
  groupKey: 'time',
  data: baseData,
  // Off by default: the tooltip then shows the date in the title and plain numbers in the
  // values, which is what the built-in formatter does.
  useCustomValueFormatter: false,
  withZeroValue: false,
  curveName: 'linear',
  highlightDots: 'none',
  dataType: 'none',
  singleSeries: false,
  withInterpolatedGaps: false,
});

Demo.defaultProps = defaultProps;

export default Demo;
