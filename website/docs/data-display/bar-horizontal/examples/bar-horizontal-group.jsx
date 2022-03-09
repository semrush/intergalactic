import React from 'react';
import { Plot, GroupBar, YAxis, XAxis, HoverRect, Tooltip, colors } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 10]);

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
                  <Tooltip.Dot mr={4}>Bar 1</Tooltip.Dot>
                  <Text bold>{data[yIndex].bar1}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['green-02']}>
                    Bar 2
                  </Tooltip.Dot>
                  <Text bold>{data[yIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <GroupBar y="category">
        <GroupBar.HorizontalBar x="bar1" />
        <GroupBar.HorizontalBar x="bar2" color={colors['green-02']} />
      </GroupBar>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  bar1: Math.random().toFixed(1) * 10,
  bar2: Math.random().toFixed(1) * 10,
}));
