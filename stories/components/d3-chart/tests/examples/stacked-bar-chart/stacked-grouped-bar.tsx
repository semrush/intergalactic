import React from 'react';
import { Plot, YAxis, XAxis, StackGroupBar, HoverRect } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const data = [
  { category: 'Category 1', a: 4, b: 6, c: 3, d: 5 },
  { category: 'Category 2', a: 5, b: 3, c: 4, d: 6 },
  { category: 'Category 3', a: 6, b: 2, c: 5, d: 3 },
  { category: 'Category 4', a: 3, b: 7, c: 2, d: 4 },
  { category: 'Category 5', a: 7, b: 1, c: 6, d: 2 },
];

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 220;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 20]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>

      {/* Required for tooltip hover area */}
      <HoverRect x="category" />

      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => {
          const item = data[xIndex];
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{item.category}</HoverRect.Tooltip.Title>
                <Text bold>Group 1</Text>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>a</HoverRect.Tooltip.Dot>
                  <Text bold>{item.a}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>b</HoverRect.Tooltip.Dot>
                  <Text bold>{item.b}</Text>
                </Flex>

                <Text bold mt={3}>Group 2</Text>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>c</HoverRect.Tooltip.Dot>
                  <Text bold>{item.c}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>d</HoverRect.Tooltip.Dot>
                  <Text bold>{item.d}</Text>
                </Flex>

                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total group 1</Box>
                  <Text bold>{item.a + item.b}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total group 2</Box>
                  <Text bold>{item.c + item.d}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>

      <StackGroupBar x='category'>
        <StackGroupBar.Bar group='x' y='a' />
        <StackGroupBar.Bar group='x' y='b' />
        <StackGroupBar.Bar group='z' y='c' />
        <StackGroupBar.Bar group='z' y='d' />
      </StackGroupBar>
    </Plot>
  );
};

export default Demo;
