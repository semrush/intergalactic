---
title: Stacked horizontal bar chart
fileSource: d3-chart
tabs: Design('stacked-horizontal-bar'), A11y('stacked-horizontal-bar-a11y'), API('stacked-horizontal-bar-api'), Examples('stacked-horizontal-bar-d3-code'), Changelog('d3-chart-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BarChartProps } from '@semcore/d3-chart';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Category1: Math.random() * 10,
  Category2: Math.random() * 10,
  Category3: Math.random() * 10,
}));

const App = PlaygroundGeneration((preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

  const {
    direction,
    alignItems,
    showXAxis,
    showYAxis,
    showTooltip,
    showTotalInTooltip,
    showLegend,
    legendProps,
    patterns,
  } = chartPlayground(
    { select, radio, label, bool },
    { invertAxis: true, showTotalInTooltip: true },
  );

  const chartProps: BarChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 300,
    plotHeight: 300,
    showTotalInTooltip,
    direction,
    showTooltip,
    showXAxis,
    showYAxis,
    alignItems,
    patterns,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Bar {...chartProps} type={'stack'} invertAxis={true} />;
}, {filterProps: ['data']});
</script>

:::

::: info
Basic data visualization rules are described in the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Horizontal stacked bar chart** is used to display multiple categories of values and illustrate their proportions relative to the total.

**Key points for using horizontal stacked bar chart:**

- Choose this chart to compare more than two categories.
- It's ideal for showing how parts contribute to a whole.
- Pick distinctly different colors for clarity. Avoid using too many colors for categories. Shades of one color can work well.
- Ensure the chart is large enough to easily read the data.

::: tip
**Bar vs. Histogram Chart**

- Bar charts categorize data qualitatively, showing how different categories compare.
- Histograms organize data quantitatively, indicating how often values fall within certain ranges.
:::

## Usage

Refer to [Horizontal bar chart > Usage](/data-display/bar-horizontal/bar-horizontal#usage).

## Appearance

Choose contrasting colors for different categories.

![bar-chart stacked](static/stacked.png)

### Margins

Refer to [Horizontal bar chart > Margins](/data-display/bar-horizontal/bar-horizontal#margins).

## Grid and axes

Refer to [Horizontal bar chart > Grid and axes](/data-display/bar-horizontal/bar-horizontal#grid-and-axes).

## Category labels

Refer to [Horizontal bar chart > Category labels](/data-display/bar-horizontal/bar-horizontal#category-labels).

## Legend

Refer to [Horizontal bar chart > Legend](/data-display/bar-horizontal/bar-horizontal#legend).

## Interaction

Hovering highlights a bar with `--chart-grid-bar-chart-hover`, indicating focus or clickability. The hover takes up half of the bars margin on the top and bottom sides.

![stacked bar chart](static/hover.png)

## Edge cases

Refer to [Horizontal bar chart > Edge cases](/data-display/bar-horizontal/bar-horizontal#edge-cases).

## Initial data loading

Refer to [Horizontal bar chart > Initial data loading](/data-display/bar-horizontal/bar-horizontal#initial-data-loading).
