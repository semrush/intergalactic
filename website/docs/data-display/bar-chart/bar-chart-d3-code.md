---
title: Bar chart
fileSource: d3-chart
tabs: Design('bar-chart'), A11y('bar-chart-a11y'), API('bar-chart-api'), Examples('bar-chart-d3-code'), Changelog('d3-chart-changelog')
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

## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

::: sandbox

<script lang="tsx">
  export Demo from './examples/bar.tsx';
</script>

:::

## Bar hover

The `<HoverRect/>` component draws a rectangle when hovering the cursor over a chart. It's similar to how the `<HoverLine/>` component works for the line chart.

::: sandbox

<script lang="tsx">
  export Demo from './examples/bar-hover.tsx';
</script>

:::

## Tooltip

You can add a tooltip to any element of a chart. The internal content can be easily identified with a function.

::: sandbox

<script lang="tsx">
  export Demo from './examples/tooltip.tsx';
</script>

:::

## Date format

Use `scaleBand` when you need to display dates on one of the axes.

::: sandbox

<script lang="tsx">
  export Demo from './examples/date-format.tsx';
</script>

:::

## Negative values

The bar can also have negative values. For better readability, add an additional `XAxis` positioned at zero at the end.

::: sandbox

<script lang="tsx">
  export Demo from './examples/negative-values.tsx';
</script>

:::

## Grouped bars

To combine multiple bars, use `<GroupBar/>` and `<GroupBar.Bar/>`.

::: tip
The `<GroupBar.Bar/>` component is a customized `<Bar/>` that has the same API.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/grouped-bars.tsx';
</script>

:::

## Trend line

You can combine charts with each other. For example, to display a trend line on a bar chart.

::: sandbox

<script lang="tsx">
  export Demo from './examples/trend-line.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/legend-and-pattern-fill.tsx';
</script>

:::
