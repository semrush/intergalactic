import { Box } from '@semcore/ui/base-components';
import type { LineChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

type LineChartStoryProps = LineChartProps & {
  useExplicitPlotWidth?: boolean;
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
    ...chartProps
  } = getPropsToChart(props);

  const handleResize: NonNullable<LineChartProps['onResize']> = (size, entries) => {
    setMeasuredSize(size);
    onResize?.(size, entries);
  };

  const responsiveChartProps: LineChartProps = {
    ...(chartProps as LineChartProps),
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
});

Demo.defaultProps = defaultProps;

export default Demo;
