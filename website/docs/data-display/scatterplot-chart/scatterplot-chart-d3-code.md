---
title: Scatterplot chart
fileSource: d3-chart
tabs: Design('scatterplot-chart'), A11y('scatterplot-chart-a11y'), API('scatterplot-chart-api'), Examples('scatterplot-chart-d3-code'), Changelog('d3-chart-changelog')
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
  return <Chart.ScatterPlot data={data} plotWidth={500} plotHeight={300} groupKey={'x'} />;
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Scatter plot

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
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
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x='x' y='y' />
      <ScatterPlot.Tooltip>
        {({ index }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Title>Data</ScatterPlot.Tooltip.Title>
                <Text tag='div'>X axis {data[index].x}</Text>
                <Text tag='div'>Y axis {data[index].y}</Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Color customization

If required, you can assign your own color to Scatter plot.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
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
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x='x' y='y1' color='#2BB3FF' />
      <ScatterPlot x='x' y='y2' color='#59DDAA' />
      <ScatterPlot.Tooltip>
        {({ index, x, y, color }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Dot color={color}>Data</ScatterPlot.Tooltip.Dot>
                <Text tag='div'>X axis {data[index][x]}</Text>
                <Text tag='div'>Y axis {data[index][y]}</Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
  }));
</script>

:::

## Scatter plot with values inside

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
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
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x='x' y='y' value='value' />
      <ScatterPlot.Tooltip>
        {({ index, x, y, value }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Title>Data</ScatterPlot.Tooltip.Title>
                <Text tag='div'>X axis {data[index][x]}</Text>
                <Text tag='div'>Y axis {data[index][y]}</Text>
                <Text tag='div'>Value {data[index][value]}</Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
    value: i,
  }));
</script>

:::

## Legend

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax, ChartLegend } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

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

  const legendItems = Object.keys(data[0])
    .filter((name) => name !== 'x' && name !== 'value')
    .map((item, index) => {
      return {
        id: item,
        label: `Point ${item}`,
        checked: true,
        color: `chart-palette-order-${index + 1}`,
      };
    });

  return (
    <>
      <ChartLegend items={legendItems} shape={'Square'} />
      <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {legendItems
          .filter((item) => item.checked)
          .map((item, index) => {
            return (
              <ScatterPlot key={item.id} x={'x'} y={item.id} value={'value'} color={item.color} />
            );
          })}
      </Plot>
    </>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    1: Math.random() * 10,
    2: Math.random() * 10,
    3: Math.random() * 10,
    value: i,
  }));
</script>

:::

## Color customization and values inside

If required, you can assign your own color to Scatter plot.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
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
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x='x' y='y1' value='value' color='#2BB3FF' valueColor='#008ff8' />
      <ScatterPlot x='x' y='y2' value='value' color='#59DDAA' valueColor='#00C192' />
      <ScatterPlot.Tooltip>
        {({ index, x, y, value }) => {
          return {
            children: (
              <>
                <ScatterPlot.Tooltip.Title>Data</ScatterPlot.Tooltip.Title>
                <Text tag='div'>X axis {data[index][x]}</Text>
                <Text tag='div'>Y axis {data[index][y]}</Text>
                <Text tag='div'>Value {data[index][value]}</Text>
              </>
            ),
          };
        }}
      </ScatterPlot.Tooltip>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
    value: i,
  }));
</script>

:::

## Data loading

::: sandbox

<script lang="tsx">
import React from 'react';
import { ScatterPlotChartSkeleton } from '@semcore/ui/skeleton';

const Demo = () => (
  <React.Fragment>
    <ScatterPlotChartSkeleton />
  </React.Fragment>
);
</script>

:::
