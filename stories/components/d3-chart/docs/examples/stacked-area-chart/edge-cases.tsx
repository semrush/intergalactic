import { Flex } from '@semcore/ui/base-components';
import { Plot, XAxis, YAxis, minMax, StackedArea, HoverLine } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import StackAreaMockData from '../../../__mocks__/stacked-area';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height} patterns>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={data.map((d) => +d.time)} />
      </XAxis>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].time}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Stack 1</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Stack 2</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Stack 3</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack3 ?? 'n/a'}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <StackedArea x='time'>
        <StackedArea.Area y='stack1'>
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack2'>
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack3'>
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
    </Plot>
  );
};

const data = StackAreaMockData.EdgeCase;

export default Demo;
