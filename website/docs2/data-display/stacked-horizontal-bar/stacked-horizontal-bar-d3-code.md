---
title: Examples
fileSource: d3-chart
tabs: Stacked horizontal bar chart('stacked-horizontal-bar'), A11y('stacked-horizontal-bar-a11y'), API('stacked-horizontal-bar-api'), Examples('stacked-horizontal-bar-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).
:::

## Horizontal bar

You can rotate a chart using the `<HorizontalBar/>` component by swapping `scaleBand` and `scaleLinear`. See more about `scaleBand` and `scaleLiner` in the [Bar chart guide](/data-display/bar-chart/bar-chart-d3-code/#addc35).

## Horizontal stacked bar

To draw a horizontal stacked chart, use the `<StackBar.HorizontalBar/>` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect, colors } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex, Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 20]);

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
      <StackBar y='category'>
        <StackBar.HorizontalBar x='bar1' />
        <StackBar.HorizontalBar x='bar2' color={colors['blue-02']} />
      </StackBar>
      <HoverRect.Tooltip y='category' wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Stack 1</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={colors['blue-02']}>
                    Stack 2
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar2}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total</Box>
                  <Text bold>{data[yIndex].bar1 + data[yIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  bar1: Math.random() * 10,
  bar2: Math.random() * 10,
}));
</script>

:::
