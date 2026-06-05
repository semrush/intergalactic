import { Flex, Box } from '@semcore/ui/base-components';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

const Demo = () => {
  const value = 30;

  return (
    <Flex gap={6} direction='column' alignItems='start'>

      <MiniChart.ScoreLine
        value={value}
        w={120}
        color='chart-palette-order-1'
        baseBgColor='blue-200'
      />

      <MiniChart.ScoreLine
        segments={5}
        value={3}
        w={120}
        animate={false}
        color='chart-palette-order-2'
        baseBgColor='violet-200'
      />

      <MiniChart.ScoreLine
        w={120}
        segments={3}
        value={2}
        color='chart-palette-order-3'
        baseBgColor='green-100'
      />

      <MiniChart.ScoreDonut
        value={value}
        w={50}
        baseBgColor='chart-palette-order-2'
        aria-hidden
      />

      <MiniChart.ScoreSemiDonut
        value={value}
        w={50}
        baseBgColor='chart-palette-order-2'
        aria-hidden
      />

    </Flex>
  );
};

export default Demo;
