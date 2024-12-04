import React from 'react';

import MiniChart from '@semcore/mini-chart';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Box w={'500px'}>
      <Flex flexWrap={true} alignItems={'flex-end'}>
        <MiniChart.ScoreLine value={30} w={'80px'} />
        &nbsp;
        <MiniChart.ScoreLine loading={true} value={30} w={'80px'} />
        &nbsp;
        <MiniChart.ScoreLine segments={5} value={2} w={'80px'} />
        &nbsp;
        <MiniChart.ScoreLine loading={true} segments={5} value={2} w={'80px'} />
      </Flex>
      <br />
      <MiniChart.ScoreLine w={'220px'} animate={false}>
        <MiniChart.ScoreLine.Segment value={20} color='chart-palette-order-3' />
        <MiniChart.ScoreLine.Segment value={80} color='chart-palette-order-6' />
        <MiniChart.ScoreLine.Segment value={90} color='chart-palette-order-4' />
        <MiniChart.ScoreLine.Segment value={50} color='chart-palette-order-2' />
      </MiniChart.ScoreLine>
      <br />
      {new Array(16).fill(null).map((_, index) => {
        return (
          <Flex key={index} m={'4px'}>
            <MiniChart.ScoreLine value={30} w={'80px'} color={`chart-palette-order-${index + 2}`} />
            &nbsp;
            <MiniChart.ScoreLine
              segments={3}
              value={2}
              w={'80px'}
              color={`chart-palette-order-${index + 2}`}
            />
            <br />
          </Flex>
        );
      })}
    </Box>
  );
};

export default Demo;
