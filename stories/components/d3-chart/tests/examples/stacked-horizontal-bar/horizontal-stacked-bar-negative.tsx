import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect, HorizontalBar } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const stackedData = [
  { category: 'Category 1', stack1: 0.01, stack2: 0.03, stack3: 0.01 },
  { category: 'Category 2', stack1: -0.01, stack2: -1, stack3: -0.01 },
  { category: 'Category 3', stack1: -1, stack2: -1, stack3: -1 },
  { category: 'Category 4', stack1: -0.01, stack2: -0.01, stack3: -0.01 },
  { category: 'Category 5', stack1: 3, stack2: 0, stack3: 5 },
  { category: 'Category 6', stack1: 0.01, stack2: 1, stack3: 0.01 },
];

const singleBarData = [
  { category: 'Category 1', bar: -0.05 },
  { category: 'Category 2', bar: 0 },
  { category: 'Category 3', bar: 5 },
  { category: 'Category 4', bar: 0.05 },
  { category: 'Category 5', bar: null },
  { category: 'Category 6', bar: -5 },
];

const MARGIN = 40;
const width = 500;
const height = 300;

const Demo = () => {
  // Scales for stacked bars
  const xScaleStack = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([-10, 10]);

  const yScaleStack = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(stackedData.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  // Scales for single bars
  const xScaleSingle = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([-7, 7]);

  const yScaleSingle = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(singleBarData.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  return (
    <Flex direction='row' gap ={2}>
      {/* Stacked horizontal bar chart */}
      <Plot data={stackedData} scale={[xScaleStack, yScaleStack]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
          <XAxis.Grid />
        </XAxis>

        <HoverRect y="category" />

        <HoverRect.Tooltip y='category' wMin={100}>
          {({ yIndex }) => {
            const item = stackedData[yIndex];
            return {
              children: (
                <>
                  <HoverRect.Tooltip.Title>{item.category}</HoverRect.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    <HoverRect.Tooltip.Dot mr={4} style={{ backgroundColor: '#27ae60' }} />
                    <Text bold>Stack 1: {item.stack1}</Text>
                  </Flex>
                  <Flex mt={2} justifyContent='space-between'>
                    <HoverRect.Tooltip.Dot mr={4} style={{ backgroundColor: '#2980b9' }} />
                    <Text bold>Stack 2: {item.stack2}</Text>
                  </Flex>
                  <Flex mt={2} justifyContent='space-between'>
                    <HoverRect.Tooltip.Dot mr={4} style={{ backgroundColor: '#c0392b' }} />
                    <Text bold>Stack 3: {item.stack3}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </HoverRect.Tooltip>

        <StackBar y='category'>
          <StackBar.HorizontalBar x='stack1' color="#27ae60"  duration={0} />
          <StackBar.HorizontalBar x='stack2' color="#2980b9" duration={0} />
          <StackBar.HorizontalBar x='stack3' color="#c0392b"  duration={0} />
        </StackBar>
      </Plot>

      <Box h={60} /> {/* Spacer */}

      {/* Single horizontal bar chart */}
      <Plot data={singleBarData} scale={[xScaleSingle, yScaleSingle]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
          <XAxis.Grid />
        </XAxis>

        <HoverRect y="category" />

        <HoverRect.Tooltip y='category' wMin={100}>
          {({ yIndex }) => {
            const item = singleBarData[yIndex];
            return {
              children: (
                <>
                  <HoverRect.Tooltip.Title>{item.category}</HoverRect.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    <HoverRect.Tooltip.Dot mr={4} />
                    <Text bold>{item.bar !== null ? item.bar : 'N/A'}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </HoverRect.Tooltip>

        <HorizontalBar x='bar' y='category' duration={0} />
      </Plot>
    </Flex>
  );
};

export default Demo;
