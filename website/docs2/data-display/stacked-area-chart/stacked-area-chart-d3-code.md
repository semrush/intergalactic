---
title: Stacked area chart
fileSource: d3-chart
tabs: Design('stacked-area-chart'), A11y('stacked-area-chart-a11y'), API('stacked-area-chart-api'), Examples('stacked-area-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/d3-chart).
:::

## Stacked area

If you need to display a part-to-whole ratio – use the `<StackedArea/>` and `<StackedArea.Area/>` components.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, colors, StackedArea, HoverLine } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex, Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { curveCardinal } from 'd3-shape';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

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
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={data.map((d) => +d.time)}>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <StackedArea x='time'>
        <StackedArea.Area y='stack1' curve={curveCardinal}>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack2' fill='#59DDAA50' color='#59DDAA' curve={curveCardinal}>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack3' fill='#FF622D50' color='#FF622D' curve={curveCardinal}>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>
                  {formatDate(data[xIndex].time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Stack 1</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4} color={colors['green-02']}>
                    Stack 2
                  </HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4} color={colors['orange-04']}>
                    Stack 3
                  </HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack3}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total</Box>
                  <Text bold>
                    {data[xIndex].stack1 + data[xIndex].stack2 + data[xIndex].stack3}
                  </Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
    </Plot>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));
</script>

:::

## Edge cases

- If a part of the chart has no data – use a dashed line to draw that period.
- If the data has only one value – display it as a dot.
- Two consecutively known values will automatically be displayed as the `StackedArea` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, colors, StackedArea, HoverLine } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

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
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={data.map((d) => +d.time)} />
      </XAxis>
      <StackedArea x='time'>
        <StackedArea.Area y='stack1'>
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack2' fill='#59DDAA50' color='#59DDAA'>
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack3' fill='#FF622D50' color='#FF622D'>
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
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
                  <HoverLine.Tooltip.Dot mr={4} color={colors['green-02']}>
                    Stack 2
                  </HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
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
</script>

:::
