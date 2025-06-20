import { Flex, Box } from '@semcore/flex-box';
import MiniChart from '@semcore/mini-chart';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <Box w='500px'>
      <Text>0-1 values:</Text>
      <Flex flexWrap={true} alignItems='flex-end' id='0-1' gap='2'>
        <MiniChart.ScoreDonut value={0} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={0} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={0.5} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={0.5} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={1} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={1} w='50px' aria-labelledby='mylabel' />
      </Flex>
      <Text>1-97 values:</Text>
      <Flex flexWrap={true} alignItems='flex-end' id='1-97' gap='2'>
        <MiniChart.ScoreDonut value={2} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={2} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={30.01} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={30.01} w='50px' aria-labelledby='mylabel' />
      </Flex>
      <Text>97-100 values:</Text>
      <Flex flexWrap={true} alignItems='flex-end' id='97-100' gap='2'>
        <MiniChart.ScoreDonut value={97.9} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={97.9} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={98} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={98} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={98.5} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={98.5} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={98.9} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={98.9} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={99} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={99} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={99.5} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={99.5} w='50px' aria-labelledby='mylabel' />
        <MiniChart.ScoreDonut value={100} w='50px' aria-label='test' />
        <MiniChart.ScoreSemiDonut value={100} w='50px' aria-labelledby='mylabel' />
      </Flex>
      <Text>Loading:</Text>
      <Flex flexWrap={true} alignItems='flex-end' id='loading' gap='2'>
        <MiniChart.ScoreDonut loading={true} value={30} w='50px' aria-describedby='mylabel' />
        <MiniChart.ScoreSemiDonut loading={true} value={30} w='50px' aria-hidden />
      </Flex>
      <br />
      <Text>Colors:</Text>
      <Flex flexWrap={true} alignItems='flex-end'>
        {new Array(16).fill(null).map((_, index) => {
          return (
            <React.Fragment key={index}>
              <MiniChart.ScoreDonut
                value={30}
                w='50px'
                color={`chart-palette-order-${index + 2}`}
              />
              <MiniChart.ScoreSemiDonut
                value={30}
                w='50px'
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
