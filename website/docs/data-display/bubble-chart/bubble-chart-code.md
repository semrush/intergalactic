---
title: Bubble chart
fileSource: d3-chart
tabs: Design('bubble-chart'), A11y('bubble-chart-a11y'), API('bubble-chart-api'), Examples('bubble-chart-code'), Changelog('bubble-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx';
</script>

:::

::: tip
For all the following examples, scale is calculated taking into account synthetic data.
For understanding the mathematics, used in `Change.Bubble` to calculate common scale, refer to [our GitHub repository](https://github.com/semrush/intergalactic/blob/HEAD/semcore/d3-chart/src/component/Chart/BubbleChart.tsx#L63).
:::

## Bubble chart

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bubble-chart/bubble-chart.tsx';
</script>

:::

## Color customization

If required, you can assign your own color to every circle in Bubble chart. For this you need to put in the data the color for each circle.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bubble-chart/color-customization.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx';
</script>

:::

## Initial data loading

Use `BubbleChartSkeleton` for the initial chart loading.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/bubble-chart/initial-data-loading.tsx';
</script>

:::
