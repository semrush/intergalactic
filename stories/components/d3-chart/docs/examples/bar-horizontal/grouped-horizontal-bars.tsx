import { Flex } from '@semcore/ui/base-components';
import { Plot, GroupBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const Demo = () => {
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
        <YAxis.Ticks primaryText />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <HoverRect.Tooltip y='category' wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar 1</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar 2</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <GroupBar y='category'>
        <GroupBar.HorizontalBar x='bar1' />
        <GroupBar.HorizontalBar x='bar2' />
      </GroupBar>
    </Plot>
  );
};

const data = BarMockData.TwoBars;

export default Demo;
