---
title: Horizontal bar chart
fileSource: d3-chart
tabs: Design('bar-horizontal'), A11y('bar-horizontal-a11y'), API('bar-horizontal-api'), Examples('bar-horizontal-code'), Changelog('bar-horizontal-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bar-horizontal/basic-usage.tsx';
</script>

:::

## Horizontal bar

You can rotate a chart using the `<HorizontalBar/>` component by swapping `scaleBand` and `scaleLinear`. See more about `scaleBand` and `scaleLiner` in the [Bar chart example](/data-display/bar-chart/bar-chart-code#bar).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bar-horizontal/horizontal-bar.tsx';
</script>

:::

## Bar labels

To draw the values of the bars, pass the function to `<Bar/>` to receive all required values.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bar-horizontal/bar-labels.tsx';
</script>

:::

## Grouped horizontal bars

To combine multiple horizontal bars, use `<GroupBar.HorizontalBar/>`.

::: tip
The `<GroupBar.HorizontalBar/>` component is a customized `<HorizontalBar/>` that has the same API.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bar-horizontal/grouped-horizontal-bars.tsx';
</script>

:::

## Background

::: warning
`<Bar.Background/>` and `<HorizontalBar.Background/>` have been deprecated.
:::

For cases where you need to show the distribution of values by category as parts of a whole, use the [Score bar chart](/data-display/score-bar-chart/score-bar-chart-code).

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bar-horizontal/legend-and-pattern-fill.tsx';
</script>

:::
