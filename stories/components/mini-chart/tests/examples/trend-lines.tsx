import { Flex, Box } from '@semcore/ui/base-components';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';
type trendLinesProps = { lastPointRadius: number; loading?: boolean; color?: string; lastPointColor?: string; animate?: boolean };

const Demo = ({
  loading,
  color,
  lastPointRadius,
  lastPointColor,
  animate,
}: trendLinesProps) => {
  const data = [10, 20, 50, 80, 45, 66];

  return (
    <Flex id='mylabel'>
      <MiniChart.TrendLine data={data} loading={loading} color={color} lastPointRadius={lastPointRadius} lastPointColor={lastPointColor} animate={animate} aria-hidden />
    </Flex>
  );
};
export type { trendLinesProps };

export default Demo;
