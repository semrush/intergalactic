---
title: Bubble chart
fileSource: d3-chart
tabs: Design('bubble-chart'), A11y('bubble-chart-a11y'), API('bubble-chart-api'), Examples('bubble-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart principles](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return <Chart.Bubble data={data} plotWidth={500} plotHeight={200} />;
};

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];
</script>

:::

## Bubble chart

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Bubble, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([0, 10]);

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
      <Bubble x='x' y='y' value='value' />
      <Bubble.Tooltip>
        {({ index }) => {
          return {
            children: (
              <>
                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                <Text tag='div'>X axis {data[index].x}</Text>
                <Text tag='div'>Y axis {data[index].y}</Text>
                <Text tag='div'>Value {data[index].value}</Text>
              </>
            ),
          };
        }}
      </Bubble.Tooltip>
    </Plot>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
    value: Math.random() * 1000,
  }));
</script>

:::

## Color customization

If required, you can assign your own color to every circle in Bubble chart. For this you need to put in the data the color for each circle.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Bubble, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([0, 10]);

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
      <Bubble x='x' y='y' value='value' label='label' color='color' />
      <Bubble.Tooltip>
        {({ index }) => {
          return {
            children: (
              <>
                <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                <Text tag='div'>X axis {data[index].x}</Text>
                <Text tag='div'>Y axis {data[index].y}</Text>
                <Text tag='div'>Value {data[index].value}</Text>
              </>
            ),
          };
        }}
      </Bubble.Tooltip>
    </Plot>
  );
};

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1', color: '#2BB3FF' },
  { x: 1, y: 9, value: 40, label: 'label 2', color: '#59DDAA' },
  { x: 6, y: 2, value: 45634, label: 'label 3', color: '#FF4953' },
  { x: 4, y: 7, value: 245, label: 'label 4', color: '#AB6CFE' },
  { x: 9, y: 5, value: 7462, label: 'label 5', color: '#66C030' },
];
</script>

:::

## Data loading

::: sandbox

<script lang="tsx">
import React from 'react';
import { BubbleChartSkeleton } from '@semcore/ui/skeleton';

const Demo = () => (
  <React.Fragment>
    <BubbleChartSkeleton />
  </React.Fragment>
);
</script>

:::

## Legend and pattern fill

::: sandbox

<script lang="tsx">
import React from 'react';
import {
  Plot,
  Bubble,
  XAxis,
  YAxis,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/flex-box';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 200;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([0, 10]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const legendItems = data.map((item, index) => {
    return {
      id: index.toString(),
      label: `Round item (${item.label}) [${index}]`,
      checked: true,
      color: item.color,
    };
  });

  return (
    <Flex direction='column'>
      <ChartLegend dataHints={dataHints} items={legendItems} shape={'Circle'} patterns />
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
        <Bubble x='x' y='y' value='value' label='label' color='color' />
        <Bubble.Tooltip>
          {({ index }) => {
            return {
              children: (
                <>
                  <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                  <Text tag='div'>X axis {data[index].x}</Text>
                  <Text tag='div'>Y axis {data[index].y}</Text>
                  <Text tag='div'>Value {data[index].value}</Text>
                </>
              ),
            };
          }}
        </Bubble.Tooltip>
      </Plot>
    </Flex>
  );
};

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1', color: '#2BB3FF' },
  { x: 1, y: 9, value: 40, label: 'label 2', color: '#59DDAA' },
  { x: 6, y: 2, value: 45634, label: 'label 3', color: '#FF4953' },
  { x: 4, y: 7, value: 245, label: 'label 4', color: '#AB6CFE' },
  { x: 9, y: 5, value: 7462, label: 'label 5', color: '#66C030' },
];
</script>

:::
