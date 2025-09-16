import { Flex, Box } from '@semcore/base-components';
import MiniChart from '@semcore/mini-chart';
import React from 'react';

const Demo = () => {
  const value = 30;

  return (
    <Flex gap={6} direction='column' alignItems='start'>

      <MiniChart.ScoreLine
        value={value}
        w={120}
        baseBgColor='chart-palette-order-5'
      />

      <MiniChart.ScoreLine
        segments={5}
        value={3}
        w={120}
        animate={false}
        baseBgColor='chart-palette-order-2'
      />

      <MiniChart.ScoreLine
        w={120}
        segments={3}
        value={2}
        baseBgColor='chart-palette-order-4'
      />

      <MiniChart.ScoreDonut
        value={value}
        w={50}
        baseBgColor='chart-palette-order-5'
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
