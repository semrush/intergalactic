---
title: Venn chart
fileSource: d3-chart
tabs: Design('venn-chart'), A11y('venn-chart-a11y'), API('venn-chart-api'), Examples('venn-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/venn-chart/basic-usage.tsx';
</script>

:::

## Venn

A Venn chart allows you to see all kinds of intersections between two or more data sets.

- `Circle` are a component for circles.
- `Intersection` is for intersections between the circles.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/venn-chart/venn.tsx';
</script>

:::

## Custom intersection styles

If you want to change the intersection styles, you can add additional styles to the selected intersection.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/venn-chart/custom-intersection-styles.tsx';
</script>

:::

## Setting orientation

You can also change the orientation and stacking order of the circles.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/venn-chart/setting-orientation.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/venn-chart/legend-and-pattern-fill.tsx';
</script>

:::