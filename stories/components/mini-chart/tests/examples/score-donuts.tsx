import { Flex } from '@semcore/ui/base-components';
import type { NSMiniChart } from '@semcore/ui/mini-chart';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type ScoreDonutsProps = NSMiniChart.Score.Donut.Props;

const Demo = ({
  value = 4,
  loading,
  color,
  baseBgColor,
  animate,
}: ScoreDonutsProps) => {
  return (

    <Flex flexWrap={true} alignItems='flex-end'>
      <MiniChart.ScoreDonut value={value} loading={loading} color={color} baseBgColor={baseBgColor} animate={animate} w='50px' aria-label='test' />
      <MiniChart.ScoreSemiDonut value={value} loading={loading} color={color} baseBgColor={baseBgColor} animate={animate} w='50px' aria-labelledby='mylabel' aria-hidden />
    </Flex>

  );
};

export type { ScoreDonutsProps };
export default Demo;
