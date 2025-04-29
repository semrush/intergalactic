import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 20]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.bar))
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
      <HoverRect.Tooltip y='bar' wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].bar}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Category 1</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].cat1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Category 2</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].cat2}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total</Box>
                  <Text bold>{data[yIndex].cat1 + data[yIndex].cat2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <StackBar y='bar'>
        <StackBar.HorizontalBar x='cat1' />
        <StackBar.HorizontalBar x='cat2' />
      </StackBar>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  bar: `Bar ${i + 1}`,
  cat1: Math.random() * 10,
  cat2: Math.random() * 10,
}));

export default Demo;
