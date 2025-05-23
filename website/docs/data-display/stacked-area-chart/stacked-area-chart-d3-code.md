---
title: Stacked area chart
fileSource: d3-chart
tabs: Design('stacked-area-chart'), A11y('stacked-area-chart-a11y'), API('stacked-area-chart-api'), Examples('stacked-area-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-area-chart/basic-usage.tsx';
</script>

:::

## Stacked area

If you need to display a part-to-whole ratio – use the `<StackedArea/>` and `<StackedArea.Area/>` components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-area-chart/stacked-area.tsx';
</script>

:::

## Edge cases

- If a part of the chart has no data – use a dashed line to draw that period.
- If the data has only one value – display it as a dot.
- Two consecutively known values will automatically be displayed as the `StackedArea` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-area-chart/edge-cases.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/stacked-area-chart/legend-and-pattern-fill.tsx';
</script>

:::