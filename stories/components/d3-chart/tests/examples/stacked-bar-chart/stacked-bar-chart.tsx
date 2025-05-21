import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 220;

  const data = [
    { bar: 'Bar 1', category1: 4, category2: 6 },
    { bar: 'Bar 2', category1: 7, category2: 3 },
    { bar: 'Bar 3', category1: 2, category2: 8 },
    { bar: 'Bar 4', category1: 5, category2: 5 },
    { bar: 'Bar 5', category1: 6, category2: 4 },
  ];

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.bar))
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

      {/* Add this for tooltip interaction */}
      <HoverRect x="bar" />

      <HoverRect.Tooltip x="bar" wMin={100}>
        {({ xIndex }) => {
          const item = data[xIndex];
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{item.bar}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Stack 1</HoverRect.Tooltip.Dot>
                  <Text bold>{item.category1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Stack 2</HoverRect.Tooltip.Dot>
                  <Text bold>{item.category2}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total</Box>
                  <Text bold>{item.category1 + item.category2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>

      <StackBar x='bar'>
        <StackBar.Bar y='category1' />
        <StackBar.Bar y='category2' />
      </StackBar>
    </Plot>
  );
};

export default Demo;
