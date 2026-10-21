import { Flex } from '@semcore/ui/base-components';
import type { NSMiniChart } from '@semcore/ui/mini-chart';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type TrendLinesProps = Omit<NSMiniChart.Trend.Line.Props, 'data'> & {
  chartType: 'line' | 'area';
};

const Demo = ({
  chartType,
  loading,
  color,
  lastPointRadius,
  lastPointColor,
  animate,
}: TrendLinesProps) => {
  const data = [10, 20, 50, 80, 45, 66];
  const TrendChart = chartType === 'area' ? MiniChart.TrendArea : MiniChart.TrendLine;

  return (
    <Flex id='mylabel'>
      <TrendChart data={data} loading={loading} color={color} lastPointRadius={lastPointRadius} lastPointColor={lastPointColor} animate={animate} aria-hidden />
    </Flex>
  );
};

export const defaultTrendLinesProps: TrendLinesProps = {
  chartType: 'line',
  loading: false,
  animate: true,
};

Demo.defaultProps = defaultTrendLinesProps;

export type { TrendLinesProps };

export default Demo;
