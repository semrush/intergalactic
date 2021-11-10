import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect, Tooltip, colors } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 20]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis hide={false}>
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <Tooltip tag={HoverRect} y="category" wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{data[yIndex].category}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                  <Text bold>{data[yIndex].bar1}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['blue-02']}>
                    Stack 2
                  </Tooltip.Dot>
                  <Text bold>{data[yIndex].bar2}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Box mr={4}>Total</Box>
                  <Text bold>{data[yIndex].bar1 + data[yIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <StackBar y="category">
        <StackBar.HorizontalBar x="bar1" />
        <StackBar.HorizontalBar x="bar2" color={colors['blue-02']} />
      </StackBar>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  bar1: Math.random().toFixed(1) * 10,
  bar2: Math.random().toFixed(1) * 10,
}));
