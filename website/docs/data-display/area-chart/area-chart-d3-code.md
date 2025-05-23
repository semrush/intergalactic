---
title: Area chart
fileSource: d3-chart
tabs: Design('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/area-chart/basic-usage.tsx';
</script>

:::

## Area

- You can draw a chart with areas using the `Area` component.
- `Dots` are the dots on the line chart.
- As with the [Line chart](/data-display/line-chart/line-chart-d3-code), you can draw a polyline or a smoothed chart by passing the required method to the curve property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/area-chart/area.tsx';
</script>

:::

## Edge cases

- If a part of the chart has no data – use a dashed line to draw the period.
- If the data has only one value – display it as a dot.
- Two consecutively known values will automatically be displayed as the `Area` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/area-chart/edge-cases.tsx';
</script>

:::

## Custom line

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/area-chart/custom-line.tsx';
</script>

:::

## Interpolation

If exact values of specific point is not available, you can pass `interpolateValue` and value will be automatically interpolated.

::: warning
:rotating_light: Interpolation doesn't works with `StackedArea`.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/area-chart/interpolation.tsx';
</script>

:::

## Legend and pattern fill

To make data available without relying only on colors (for example, for different kinds of colorblind and high-contrast modes), use the `patterns` property.

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/area-chart/legend-and-pattern-fill.tsx';
</script>

:::
