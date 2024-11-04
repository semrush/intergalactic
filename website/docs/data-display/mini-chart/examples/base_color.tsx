import React from 'react';
import MiniChart from '@semcore/mini-chart';
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  const value = 30;

  return (
    <Flex gap={'40px'}>
      <Box w={'300px'}>
        <MiniChart.ScoreLine value={value} w={'120px'} baseBgColor={'chart-palette-order-5'} />
        <br />
        <MiniChart.ScoreLine
          segments={5}
          value={3}
          w={'80px'}
          animate={false}
          baseBgColor={'chart-palette-order-2'}
        />
        <br />
        <MiniChart.ScoreLine segments={3} value={2} baseBgColor={'chart-palette-order-4'} />
        <br />
        <MiniChart.ScoreDonut value={value} w={'50px'} baseBgColor={'chart-palette-order-5'} />
        <br />
        <MiniChart.ScoreSemiDonut value={value} w={'50px'} baseBgColor={'chart-palette-order-2'} />
      </Box>
    </Flex>
  );
};

export default Demo;
