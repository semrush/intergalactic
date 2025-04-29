import React from 'react';
import { Plot, YAxis, XAxis, StackGroupBar, HoverRect } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

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
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Text bold>Group 1</Text>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>a</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].a}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>b</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].b}</Text>
                </Flex>
                <Text bold>Group 2</Text>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>c</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].c}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>d</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].d}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total group 1</Box>
                  <Text bold>{data[xIndex].a + data[xIndex].b}</Text>
                </Flex>

                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total group 2</Box>
                  <Text bold>{data[xIndex].c + data[xIndex].d}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <StackGroupBar x='category'>
        <StackGroupBar.Bar group='x' y={'a'} />
        <StackGroupBar.Bar group='x' y={'b'} />
        <StackGroupBar.Bar group='z' y={'c'} />
        <StackGroupBar.Bar group='z' y={'d'} />
      </StackGroupBar>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  a: Math.random() * 10,
  b: Math.random() * 10,
  c: Math.random() * 10,
  d: Math.random() * 10,
}));

export default Demo;
