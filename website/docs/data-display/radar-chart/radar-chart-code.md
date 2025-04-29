---
title: Radar chart
fileSource: d3-chart
tabs: Design('radar-chart'), API('radar-chart-api'), Examples('radar-chart-code')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/basic-usage.tsx';
</script>

:::

## Scale

You must pass a scale with a specified `domain`, `range` doesn't need to be specified as it is calculated automatically.
You can modify the range or use a non-linear scale.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/scale.tsx';
</script>

:::

## Color

You can change the color by passing the `color` property to the `<Radar.Polygon/>`.
It is also possible to pass the 'color' property to `<Radar.Polygon.Line/>` and `<Radar.Polygon.Dots/>`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/color.tsx';
</script>

:::

## Background color

You can use the `fill="transparent"` property to make polygons transparent.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/background-color.tsx';
</script>

:::

## Label long

If your labels are too long, you can move them to the next line using the line break symbol `\n`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/label-long.tsx';
</script>

:::

## Label custom

If you need a custom React component instead of a label, you can change the display in the render function.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/label-custom.tsx';
</script>

:::

## Tooltip

You need to use the `<Radar.Tooltip />` component to add interactivity.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/tooltip.tsx';
</script>

:::

## Circle

To make the chart round, you need to pass the parameter `type="circle"`.
You can also round the polygons by passing the "curve" parameter from D3 into them.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/circle.tsx';
</script>

:::

## Tick size

To change the distance between the grid lines, you need to change the value of the `tickSize` parameter.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/tick-size.tsx';
</script>

:::

## Rotated

To change base angle of the chart, set `angleOffset` (in radians) parameter.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/rotated.tsx';
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radar-chart/legend-and-pattern-fill.tsx';
</script>

:::
