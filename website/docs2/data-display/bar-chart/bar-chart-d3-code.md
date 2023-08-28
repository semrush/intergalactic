---
title: Examples
fileSource: d3-chart
tabs: Bar chart('bar-chart'), Vertical bar chart('bar-chart-vertical'), A11y('bar-chart-a11y'), API('bar-chart-api'), Examples('bar-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).
:::

## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Bar, YAxis, XAxis } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';

export default () => {
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
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bar x='category' y='bar' />
    </Plot>
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

## Hover bar

The `<HoverRect/>` component draws a rectangle when hovering the cursor over a chart. It's similar to how the `<HoverLine/>` component works for the line chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, HoverRect, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';

export default () => {
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
    .domain(minMax(data, 'bar'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverRect x='category' />
    </Plot>
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

## Tooltip

You can add a tooltip to any element of a chart. The internal content can be easily identified with a function.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Bar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
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
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bar x='category' y='bar' />
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Bar</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].bar}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
    </Plot>
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

## Date format

Use `scaleBand` when you need to display dates on one of the axes.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Bar, ResponsiveContainer, XAxis, Plot, YAxis } from '@semcore/ui/d3-chart';

export default () => {
  const [[width, height], setSize] = useState([0, 0]);
  const MARGIN = 40;

  const xScale = scaleBand()
    .domain(data.map((d) => d.date_chart))
    .range([MARGIN, width - MARGIN])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.download))])
    .range([height - MARGIN, MARGIN]);

  const getDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return (
    <ResponsiveContainer h={300} onResize={setSize}>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
            {({ value, index }) => ({ children: index % 2 === 0 ? getDate(value) : '' })}
          </XAxis.Ticks>
        </XAxis>
        <Bar x='date_chart' y='download' />
      </Plot>
    </ResponsiveContainer>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  download: 172 + 10 * i,
  date_chart: 1594791280000 + 1000000000 * i,
}));
</script>

:::

## Negative bar

The bar can also have negative values. For better readability, add an additional `XAxis` positioned at zero at the end.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Bar, YAxis, XAxis, HoverRect, colors } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
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
    .domain([-10, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bar x='category' y='bar1' color={colors['green-02']} />
      <Bar x='category' y='bar2' color={colors['orange-04']} />
      <XAxis position={0} />
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={colors['green-02']}>
                    Positive
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].bar1}</Text>
                </Flex>
                <Flex justifyContent='space-between' mt={2}>
                  <HoverRect.Tooltip.Dot mr={4} color={colors['orange-04']}>
                    Negative
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
    </Plot>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: -Math.random() * 10,
  }));
</script>

:::

## Group bar

To combine multiple bars, use `<GroupBar/>` and `<GroupBar.Bar/>`.

::: tip
The `<GroupBar.Bar/>` component is a customized `<Bar/>` that has the same API.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, GroupBar, YAxis, XAxis, HoverRect, colors } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
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
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <GroupBar x='category'>
        <GroupBar.Bar y='bar1' />
        <GroupBar.Bar y='bar2' color={colors['green-02']} />
      </GroupBar>
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => ({
          children: (
            <>
              <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
              <Flex justifyContent='space-between'>
                <HoverRect.Tooltip.Dot mr={4}>Bar 1</HoverRect.Tooltip.Dot>
                <Text bold>{data[xIndex].bar1}</Text>
              </Flex>
              <Flex mt={2} justifyContent='space-between'>
                <HoverRect.Tooltip.Dot mr={4} color={colors['green-02']}>
                  Bar 2
                </HoverRect.Tooltip.Dot>
                <Text bold>{data[xIndex].bar2}</Text>
              </Flex>
            </>
          ),
        })}
      </HoverRect.Tooltip>
    </Plot>
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

## Trend line

You can combine charts with each other. For example, to display a trend line on a bar chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Bar, Line, HoverRect, HoverLine, YAxis, XAxis, minMax } from '@semcore/ui/d3-chart';
import resolveColor from '@semcore/ui/utils/color';
import { scaleLinear, scaleBand } from 'd3-scale';

export default () => {
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
    .domain(minMax(data, 'bar'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine x='category' />
      <HoverRect x='category' />
      <Bar x='category' y='bar' />
      <Line
        x='category'
        y='bar'
        color={resolveColor('wall')}
        style={{ strokeWidth: 3, strokeDasharray: 5 }}
      >
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    category: i,
    bar: Math.random() * i,
  }));
</script>

:::
