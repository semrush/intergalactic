import React from 'react';
// @ts-ignore
import MiniChart from 'intergalactic/mini-chart';
// @ts-ignore
import { Flex, Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Box w={'500px'}>
      <Flex flexWrap={true} alignItems={'flex-end'}>
        <MiniChart.ScoreDonut value={30} w={'50px'} />
        <MiniChart.ScoreSemiDonut value={45} w={'50px'} />
        <MiniChart.ScoreDonut loading={true} value={30} w={'50px'} />
        <MiniChart.ScoreSemiDonut loading={true} value={30} w={'50px'} />
      </Flex>
      <br />
      <Flex flexWrap={true} alignItems={'flex-end'}>
        {new Array(16).fill(null).map((_, index) => {
          return (
            <React.Fragment key={index}>
              <MiniChart.ScoreDonut
                value={30}
                w={'50px'}
                color={`chart-palette-order-${index + 2}`}
              />
              <MiniChart.ScoreSemiDonut
                value={30}
                w={'50px'}
                color={`chart-palette-order-${index + 2}`}
              />
            </React.Fragment>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Demo;
