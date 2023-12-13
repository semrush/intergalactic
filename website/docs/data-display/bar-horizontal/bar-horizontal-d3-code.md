---
title: Horizontal bar chart
fileSource: d3-chart
tabs: Design('bar-horizontal'), A11y('bar-horizontal-a11y'), API('bar-horizontal-api'), Examples('bar-horizontal-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart principles](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';

const Demo = () => {
  return (
    <Chart.Bar
      groupKey={'category'}
      data={data}
      plotWidth={500}
      plotHeight={300}
      invertAxis={true}
    />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random() * 10,
  }));
</script>

:::

## Horizontal bar

You can rotate a chart using the `<HorizontalBar/>` component by swapping `scaleBand` and `scaleLinear`. See more about `scaleBand` and `scaleLiner` in the [Bar chart guide](/data-display/bar-chart/bar-chart-d3-code#addc35).

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, HorizontalBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

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
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <HorizontalBar x='bar' y='category' />
      <HoverRect.Tooltip y='category' wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar}</Text>
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
  bar: Math.random() * 10,
}));
</script>

:::

## Label bar

To draw the values of the bars, pass the function to `<Bar/>` to receive all required values.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, HorizontalBar, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { useColorResolver } from '@semcore/ui/utils/lib/use/useColorResolver';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const resolveColor = useColorResolver();
  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN * 2])
    .domain([0, Math.max(...data.map((d) => Number.parseFloat(d.bar)))]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
      <HorizontalBar x='bar' y='category'>
        {({ index, x, y, width, height }) => {
          return {
            children: (
              <text
                x={x + width + 16}
                y={y + height / 2}
                textAnchor='start'
                alignmentBaseline='middle'
                fill={resolveColor('--intergalactic-text-secondary')}
              >
                $ {data[index].bar}
              </text>
            ),
          };
        }}
      </HorizontalBar>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  bar: i + (Math.random() * 10).toFixed(2),
}));
</script>

:::

## Horizontal group bar

To combine multiple horizontal bars, use `<GroupBar.HorizontalBar/>`.

::: tip
The `<GroupBar.HorizontalBar/>` component is a customized `<HorizontalBar/>` that has the same API.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, GroupBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

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
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <GroupBar y='category'>
        <GroupBar.HorizontalBar x='bar1' />
        <GroupBar.HorizontalBar x='bar2' />
      </GroupBar>
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

## Background

Use the `<Bar.Background/>` and `<HorizontalBar.Background/>` components if you need to add a background to a chart plot.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, HorizontalBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

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
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HorizontalBar x='bar' y='category'>
        <HorizontalBar.Background />
      </HorizontalBar>
      <HoverRect.Tooltip y='category' wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar</HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex].bar}</Text>
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
  bar: Math.random() * 10,
}));
</script>

:::

## Legend

::: sandbox

<script lang="tsx">
import React from 'react';
import {
  Plot,
  GroupBar,
  YAxis,
  XAxis,
  HoverRect,
  makeDataHintsContainer,
  ChartLegend,
} from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const dataHints = makeDataHintsContainer();

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

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'category')
      .map((item, index) => {
        return {
          id: item,
          label: `Bar ${item}`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

  const [highlightedLine, setHighlightedLine] = React.useState(-1);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });
    });
  }, []);

  const handleMouseEnter = React.useCallback((id: string) => {
    setHighlightedLine(legendItems.findIndex((line) => line.id === id));
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    setHighlightedLine(-1);
  }, []);

  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        onMouseEnterItem={handleMouseEnter}
        onMouseLeaveItem={handleMouseLeave}
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
      >
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <GroupBar y='category'>
          {legendItems
            .filter((item) => item.checked)
            .map((item, index) => {
              return (
                <GroupBar.HorizontalBar
                  key={item.id}
                  x={item.id}
                  color={item.color}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                />
              );
            })}
        </GroupBar>
        <HoverRect.Tooltip y='category' wMin={100}>
          {({ yIndex }) => ({
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[yIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={legendItems[0].color}>
                    Bar 1
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex][1]}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={legendItems[1].color}>
                    Bar 2
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[yIndex][2]}</Text>
                </Flex>
              </>
            ),
          })}
        </HoverRect.Tooltip>
      </Plot>
    </>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    1: Math.random() * 10,
    2: Math.random() * 10,
  }));
</script>

:::
