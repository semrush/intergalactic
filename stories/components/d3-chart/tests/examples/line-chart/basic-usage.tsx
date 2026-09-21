import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { BAD, Chart, GOOD, HIGHLIGHT_DOT, INSIGHTFUL } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

export type HighlightDotsMode = 'none' | 'good' | 'bad' | 'insightful' | 'mixed';

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
    ...chartProps
  } = getPropsToChart(props);
  const chartData = React.useMemo(
    () => withHighlights((chartProps as LineChartProps).data ?? data, highlightDots),
    [(chartProps as LineChartProps).data, highlightDots],
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
});

Demo.defaultProps = defaultProps;

export default Demo;
