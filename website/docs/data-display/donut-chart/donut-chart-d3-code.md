---
title: Donut / Pie chart
fileSource: d3-chart
tabs: Design('donut-chart'), A11y('donut-chart-a11y'), API('donut-chart-api'), Examples('donut-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/basic-usage.tsx';
</script>

:::

## Advanced usage

- You can draw donut and pie charts with the `Donut` component.
- `Pie` is a separate sector.
- `Label` is a text label inside the chart.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/donut.tsx';
</script>

:::

## Controlled highlight

Use `active` property to control segments highlight.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/donut-controlled-highlight.tsx';
</script>

:::

## Semi-Donut

To create a half-size chart, you need to specify the `halfsize` value and reduce the height of the chart by half.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/semi-donut.tsx';
</script>

:::

## Edge cases

- If any data is missing – don't display it on the chart.
- If only one value is known – display it with a small sector. Be sure to also specify the percentage or value of the unknown data.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/edge-cases.tsx';
</script>

:::

- If there is no data – show an empty gray chart.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/edge-cases.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/donut-chart/legend-and-pattern-fill.tsx';
</script>

:::
