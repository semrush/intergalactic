import React from 'react';
import { Plot, XAxis, YAxis, minMax, colors, StackedArea, HoverLine } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
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
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={data.map((d) => +d.time)} />
      </XAxis>
      <StackedArea x="time">
        <StackedArea.Area y="stack1">
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y="stack2" fill="#59DDAA50" color="#59DDAA">
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y="stack3" fill="#FF622D50" color="#FF622D">
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
      <HoverLine.Tooltip x="time" wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].time}</HoverLine.Tooltip.Title>
                <Flex justifyContent="space-between">
                  <HoverLine.Tooltip.Dot mr={4}>Stack 1</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <HoverLine.Tooltip.Dot mr={4} color={colors['green-02']}>
                    Stack 2
                  </HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <HoverLine.Tooltip.Dot mr={4} color={colors['orange-04']}>
                    Stack 3
                  </HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack3 ?? 'n/a'}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
    </Plot>
  );
};

const data = [
  { time: 0, stack1: 1, stack2: 4, stack3: 3 },
  { time: 1, stack1: 2, stack2: 3, stack3: 4 },
  { time: 2, stack1: 1, stack2: 4, stack3: 5 },
  { time: 3, stack1: null, stack2: null, stack3: null },
  { time: 4, stack1: null, stack2: null, stack3: null },
  { time: 5, stack1: 3, stack2: 4, stack3: 3 },
  { time: 6, stack1: null, stack2: null, stack3: null },
  { time: 7, stack1: 2, stack2: 5, stack3: 3 },
  { time: 8, stack1: 2, stack2: 6, stack3: 5 },
  { time: 9, stack1: 5, stack2: 5, stack3: 3 },
];
