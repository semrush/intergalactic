---
title: Scatterplot chart
fileSource: d3-chart
tabs: Design('scatterplot-chart'), A11y('scatterplot-chart-a11y'), API('scatterplot-chart-api'), Examples('scatterplot-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic-usage.tsx';
</script>

:::

::: tip
For all the following examples, scale is calculated taking into account synthetic data.
You can see the mathematics, used in `Change.Scatterplot` to calculate common scale, in [our GitHub repository](https://github.com/semrush/intergalactic/blob/master/semcore/d3-chart/src/component/Chart/ScatterPlotChart.tsx#L31).
:::

## Scatter plot

::: sandbox

<script lang="tsx">
  export Demo from './examples/scatter-plot.tsx';
</script>

:::

## Color customization

If required, you can assign your own color to Scatter plot.

::: sandbox

<script lang="tsx">
  export Demo from './examples/color-customization.tsx';
</script>

:::

## Scatter plot with values inside

::: sandbox

<script lang="tsx">
  export Demo from './examples/scatter-plot-with-values-inside.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/legend-and-pattern-fill.tsx';
</script>

:::

## Color customization and values inside

If required, you can assign your own color to Scatter plot.

::: sandbox

<script lang="tsx">
  export Demo from './examples/color-customization-and-values-inside.tsx';
</script>

:::

## Initial data loading

Use `ScatterPlotChartSkeleton` for the initial chart loading.

::: sandbox

<script lang="tsx">
  export Demo from './examples/initial-data-loading.tsx';
</script>

:::
