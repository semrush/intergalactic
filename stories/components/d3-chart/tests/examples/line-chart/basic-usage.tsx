import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import dataPipeline, { base as baseData, type HighlightDotsMode } from './__mocks__';
import { getChartProps, getPropsToChart } from '../stories_props_helper';

export type { HighlightDotsMode };

type LineChartStoryProps = LineChartProps & {
  /** Hands `plotWidth` to the chart instead of letting it measure its container. */
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
    data,
    ...chartProps
  } = getPropsToChart(props);
  const chartData = React.useMemo(
    () => dataPipeline({ highlightDots }, data),
    [data, highlightDots],
  );

  const handleResize: NonNullable<LineChartProps['onResize']> = (size, entries) => {
    setMeasuredSize(size);
    onResize?.(size, entries);
  };

  const responsiveChartProps: LineChartProps = {
    ...(chartProps as LineChartProps),
    data: chartData,
    aspect,
    hMax,
    hMin,
    onResize: handleResize,
    ...(useExplicitPlotWidth ? { plotWidth } : {}),
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
});

Demo.defaultProps = defaultProps;

export default Demo;
