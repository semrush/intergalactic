---
title: Examples
fileSource: d3-chart
tabs: Area chart('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).
:::

## Area

- You can draw a chart with areas using the `Area` component.
- `Dots` are the dots on the line chart.
- As with the [Line chart](/data-display/line-chart/line-chart-d3-code/), you can draw a polyline or a smoothed chart by passing the required method to the curve property.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, Area } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
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
    .domain([0, 10]);

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
      <Area x='time' y='line' curve={curveCardinal}>
        <Area.Dots display />
      </Area>
    </Plot>
  );
};

const date = new Date();
const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      time: new Date(date.setDate(date.getDate() + 5)),
      line: Math.random() * 10,
    };
  });
</script>

:::

## Edge cases

- If a part of the chart has no data – use a dashed line to draw that period.
- If the data has only one value – display it as a dot.
- Two consecutively known values will automatically be displayed as the `Area` component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, HoverLine, Area } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

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
      <Area x='x' y='y'>
        <Area.Null />
        <Area.Dots />
      </Area>
      <HoverLine.Tooltip x='x' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].y ?? 'n/a'}</Text>
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
  { x: 0, y: 1 },
  { x: 1, y: 4 },
  { x: 2, y: null },
  { x: 3, y: null },
  { x: 4, y: 1 },
  { x: 5, y: null },
];
</script>

:::

## Custom line

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import { Area, minMax, Plot, XAxis, YAxis } from '@semcore/ui/d3-chart';

const customLineStyles = { strokeWidth: 1, stroke: 'orange' };

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Area x='x' y='y' curve={curveCardinal}>
        <Area.Line style={customLineStyles} />
      </Area>
    </Plot>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      x: i,
      y: Math.random() * 10,
    };
  });
</script>

:::

## Interpolation

If exact values of specific point is not available, you can pass `interpolateValue` and value will be automatically interpolated.

::: warning
:rotating_light: Interpolation doesn't works with `StackedArea`.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, Area, interpolateValue } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
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
    .domain([0, 10]);

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
      <Area x='time' y='line1' curve={curveCardinal}>
        <Area.Dots display />
      </Area>
      <Area x='time' y='line2' curve={curveCardinal}>
        <Area.Dots display />
      </Area>
    </Plot>
  );
};

const data = [
  {
    time: new Date(Date.now() + 5 * 60 * 60 * 1000),
    line1: 5,
    line2: 3,
  },
  {
    time: new Date(Date.now() + 10 * 60 * 60 * 1000),
    line1: 8,
    line2: interpolateValue,
  },
  {
    time: new Date(Date.now() + 15 * 60 * 60 * 1000),
    line1: 4,
    line2: 8,
  },
  {
    time: new Date(Date.now() + 20 * 60 * 60 * 1000),
    line1: 5,
    line2: interpolateValue,
  },
  {
    time: new Date(Date.now() + 25 * 60 * 60 * 1000),
    line1: 5,
    line2: interpolateValue,
  },
  {
    time: new Date(Date.now() + 30 * 60 * 60 * 1000),
    line1: 3,
    line2: 1,
  },
];
</script>

:::
