import React from 'react';
import MiniChart from '@semcore/mini-chart';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  const value = 30;

  return (
    <Flex gap={'40px'}>
      <Box w={'300px'}>
        <MiniChart.ScoreLine value={value} w={'120px'} />
        <br />
        <MiniChart.ScoreLine segments={5} value={5} w={'80px'} color={'chart-palette-order-2'} />
        <br />
        <MiniChart.ScoreLine
          segments={5}
          value={3}
          w={'80px'}
          animate={false}
          color={'chart-palette-order-5'}
        />
        <br />
        <MiniChart.ScoreLine segments={3} value={2} />
        <br />
        <MiniChart.ScoreDonut value={value} w={'50px'} aria-hidden />
        <br />
        <MiniChart.ScoreSemiDonut value={value} w={'50px'} aria-hidden />
      </Box>

      <Box w={'400px'}>
        <MiniChart.TrendArea
          data={[20, 50, 33, 80, 70, 35, 10, 40, 90, 50]}
          w={'120px'}
          h={'40px'}
          aria-hidden
        />
        <br />
        <MiniChart.TrendLine
          data={[20, 50, 33, 80, 70, 35, 10, 40, 90, 50]}
          w={'120px'}
          h={'40px'}
          aria-hidden
        />
        <br />
        <MiniChart.TrendArea
          data={[20, 50, 80, 65, 33, 12, 15, 18]}
          w={'120px'}
          h={'80px'}
          lastPointColor={'chart-palette-order-15'}
          aria-hidden
        />
        <br />
        <MiniChart.TrendLine
          w={'120px'}
          h={'40px'}
          data={[20, 50, 33, 80]}
          animate={false}
          lastPointColor={'chart-palette-order-2'}
          aria-hidden
        />
        <br />
        <MiniChart.TrendBar
          w={'120px'}
          h={'40px'}
          data={[
            { value: 10 },
            { value: 20 },
            { value: 50 },
            { value: 80, color: 'chart-palette-order-1' },
            { value: 45 },
            { value: 66 },
          ]}
          aria-hidden
        />

        <MiniChart.TrendHistogram
          w={'120px'}
          h={'40px'}
          data={[
            { value: 10 },
            { value: 20 },
            { value: 50 },
            { value: 80, color: 'chart-palette-order-3' },
            { value: 45 },
            { value: 66, color: 'chart-palette-order-6' },
          ]}
          animate={false}
          aria-hidden
        />
      </Box>
    </Flex>
  );
};

export default Demo;
