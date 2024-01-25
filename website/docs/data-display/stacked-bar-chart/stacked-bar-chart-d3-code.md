---
title: Stacked bar chart
fileSource: d3-chart
tabs: Design('stacked-bar-chart'), A11y('stacked-bar-chart-a11y'), API('stacked-bar-chart-api'), Examples('stacked-bar-chart-d3-code'), Changelog('d3-chart-changelog')
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
    <Chart.Bar groupKey={'category'} data={data} plotWidth={500} plotHeight={300} type={'stack'} />
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  }));
</script>

:::

## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

## Stacked bar chart

To draw a stacked chart, use `<StackBar/>` and `<StackBar.Bar/>`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

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
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Stack 1</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Stack 2</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total</Box>
                  <Text bold>{data[xIndex].stack1 + data[xIndex].stack2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
      <StackBar x='category'>
        <StackBar.Bar y='stack1' />
        <StackBar.Bar y='stack2' />
      </StackBar>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  stack1: Math.random() * 10,
  stack2: Math.random() * 10,
}));
</script>

:::

## Legend and pattern fill

::: sandbox

<script lang="tsx">
import React from 'react';
import {
  Plot,
  StackBar,
  YAxis,
  XAxis,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, 0])
    .domain([0, 15]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'category')
      .map((item, index) => {
        return {
          id: item,
          label: `Dataset${item}`,
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
    <Card w={'550px'}>
      <Card.Header pt={4}>
        <Card.Title tag={'h4'} m={0} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <ChartLegend
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
          dataHints={dataHints}
          patterns
        />
        <Plot
          data={data}
          scale={[xScale, yScale]}
          width={width}
          height={height}
          dataHints={dataHints}
          patterns
        >
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <StackBar x='category'>
            {legendItems.map((stack, index) => {
              return (
                stack.checked && (
                  <StackBar.Bar
                    y={stack.id}
                    key={stack.id}
                    color={stack.color}
                    transparent={highlightedLine !== -1 && highlightedLine !== index}
                  />
                )
              );
            })}
          </StackBar>
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  1: Math.random() * 5,
  2: Math.random() * 5,
  3: Math.random() * 5,
}));
</script>

:::
