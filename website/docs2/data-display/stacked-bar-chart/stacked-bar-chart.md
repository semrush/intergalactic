---
title: Stacked bar chart
fileSource: d3-chart
tabs: Design('stacked-bar-chart'), A11y('stacked-bar-chart-a11y'), API('stacked-bar-chart-api'), Examples('stacked-bar-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
Basic data visualization rules are described in the [Chart principles](/data-display/d3-chart/d3-chart).
:::

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BarChartProps } from '@semcore/d3-chart';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const App = PlaygroundGeneration((preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

  const {
    direction,
    alignItems,
    justifyContent,
    showXAxis,
    showYAxis,
    showTooltip,
    showTotalInTooltip,
    showLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool }, { showTotalInTooltip: true });

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
    justifyContent,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Bar {...chartProps} type={'stack'} />;
}, {filterProps: ['data']});
</script>

:::

## Description

**Stacked bar chart** is used when it's necessary to display more than two categories of values and show the ratio of them to the whole.

Important points to keep in mind when presenting data as a Stacked bar chart:

1. Use this chart type if you have more than two categories to compare.
2. Use this chart type to visualize the ratio of parts to the whole.
3. Use sufficiently contrasting colors to show different parts more clearly.
4. Don't make this chart too small in height and width – it will make it harder to read data.

## Appearance

Stacked bar chart has no margin between values inside the column. **Choose contrasting colors for different categories.**

::: tip
It is recommended to make a minimum 20% margin between a bars. This is necessary so that the data doesn't turn into a mess.
:::

![stacked bar chart](static/stacked-bar-chart.png)

### Chart colors

Use [color palette](/data-display/color-palette/color-palette) and follow the rules prescribed for it.

## Interaction

When you hover over a column, highlight it with `--chart-grid-bar-chart-hover`. The hover takes up half of the margin column on the right and left sides.

If the column is clickable, the cursor changes to `pointer`.

![stacked bar chart](static/stacked-bar-chart-hover.png)

See detailed information in the common [Bar chart guide](/data-display/bar-chart/bar-chart#a61ee5/).

## Trend

In some cases, a stacked bar chart may have a trend line. Most often, trend line overloads charts. However, in some cases, it can be useful for reading the overall trend. It helps to focus on the total value of each dot.

When you hover over any part of the bar, display the tooltip with the values for all categories and the total value.

![stacked bar chart](static/stacked-bar-chart-trend.png)

## Edge cases

Edge cases for Stacked bar chart are pretty much the same as [Bar chart](/data-display/bar-chart/bar-chart-vertical#a54381) has.

## Initial loading

See detailed information in the section about data loading in the [Bar chart guide](/data-display/bar-chart/bar-chart-vertical#ac26f2).

## Usage in UX/UI

See detailed information in the [Bar chart guide](/data-display/bar-chart/bar-chart#a1d837).

