---
title: Stacked bar chart
fileSource: d3-chart
tabs: Design('stacked-bar-chart'), A11y('stacked-bar-chart-a11y'), API('stacked-bar-chart-api'), Examples('stacked-bar-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-bar-chart/basic-usage.tsx';
</script>

:::

## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

## Stacked bar chart

To draw a stacked chart, use `<StackBar/>` and `<StackBar.Bar/>`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-bar-chart.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-bar-chart/legend-and-pattern-fill.tsx';
</script>

:::

## Stacked and grouped chart

To group bars that are not stacked, refer to [Grouped bars example](/data-display/bar-chart/bar-chart-d3-code#grouped-bars).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-bar-chart/stacked-grouped-bar.tsx';
</script>

:::
