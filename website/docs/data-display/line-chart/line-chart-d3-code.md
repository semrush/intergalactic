---
title: Line chart
fileSource: d3-chart
tabs: Design('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
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

## Line

Line charts are displayed using the `Line` component. `Dots` are the dots on the line chart.

::: sandbox

<script lang="tsx">
  export Demo from './examples/line.tsx';
</script>

:::

## Line with area

To get line with area, define `y0` and `y1` in `Line.Area` props and in the `data`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/line-with-area.tsx';
</script>

:::

## Hover line

- The `HoverLine` component is responsible for the hover effect. Use it with line charts.
- You can set the orientation of the component using the `vertical` and `horizontal` properties.

::: sandbox

<script lang="tsx">
  export Demo from './examples/hover-line.tsx';
</script>

:::

## Tooltip

You can add a tooltip to any element of a chart. The internal content can be easily identified with a function.

::: sandbox

<script lang="tsx">
  export Demo from './examples/tooltip.tsx';
</script>

:::

## Time

Use `scaleTime` for calculating intermediate date values. See the [d3 Time Scales documentation](https://github.com/d3/d3-scale#time-scales) for more information.

::: tip
If you already have the tick values, you can use `scaleLine`.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/time.tsx';
</script>

:::

## Curve

To get curved lines, transfer `curve` property with the required rounding method to the chart. You can find all available methods in the [d3 Curves documentation](https://github.com/d3/d3-shape#curves).

::: sandbox

<script lang="tsx">
  export Demo from './examples/curve.tsx';
</script>

:::

## Partial dots display

You can pass function to `display` prop of `Dots` component to control which dots should be displayed.

::: sandbox

<script lang="tsx">
  export Demo from './examples/dots-display-function.tsx';
</script>

:::

## Legend and symbols for dots

To make data available without relying only on colors (for example, for different kinds of colorblind and high-contrast modes), use the `patterns` property. With this property enabled lines become dashed and change dots to different symbols.

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/legend-and-symbols-for-dots.tsx';
</script>

:::

## Interpolation

If exact values of specific point is not available, you can pass `interpolateValue` and value will be automatically interpolated.

::: sandbox

<script lang="tsx">
  export Demo from './examples/interpolation.tsx';
</script>

:::
