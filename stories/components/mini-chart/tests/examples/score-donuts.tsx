import { Flex } from '@semcore/ui/base-components';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type scoreDonutsProps = { value: number; loading?: boolean; color?: string; baseBgColor?: string; animate?: boolean };

const Demo = ({
  value = 4,
  loading,
  color,
  baseBgColor,
  animate,
}: scoreDonutsProps) => {
  return (

    <Flex flexWrap={true} alignItems='flex-end'>
      <MiniChart.ScoreDonut value={value} loading={loading} color={color} baseBgColor={baseBgColor} animate={animate} w='50px' aria-label='test' />
      <MiniChart.ScoreSemiDonut value={value} loading={loading} color={color} baseBgColor={baseBgColor} animate={animate} w='50px' aria-labelledby='mylabel' aria-hidden />
    </Flex>

  );
};

export type { scoreDonutsProps };
export default Demo;
