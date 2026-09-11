import { Flex } from '@semcore/ui/base-components';
import type { NSMiniChart } from '@semcore/ui/mini-chart';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type TrendLinesProps = NSMiniChart.Trend.Line.Props;

const Demo = ({
  loading,
  color,
  lastPointRadius,
  lastPointColor,
  animate,
}: TrendLinesProps) => {
  const data = [10, 20, 50, 80, 45, 66];

  return (
    <Flex id='mylabel'>
      <MiniChart.TrendLine data={data} loading={loading} color={color} lastPointRadius={lastPointRadius} lastPointColor={lastPointColor} animate={animate} aria-hidden />
    </Flex>
  );
};
export type { TrendLinesProps };

export default Demo;
