---
title: Cigarette bar chart
fileSource: d3-chart
tabs: Design('cigarette-chart'), A11y('cigarette-chart-a11y'), API('cigarette-chart-api'), Examples('cigarette-chart-d3-code'), Changelog('d3-chart-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/basic-usage.tsx';
</script>

:::

## Layouts

To change the layout of the chart from horizontal to vertical, just set `invertAxis={false}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/layouts.tsx';
</script>

:::

## Tooltip type

In the tooltip, you can display the values of all chart sectors or just one of them.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/tooltip-type.tsx';
</script>

:::

## Click interaction

You can add some click interaction for the chart sectors.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/click-interaction.tsx';
</script>

:::

## No value for some key

Show null and not available data in the legend and tooltip but not on the chart.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/no-values.tsx';
</script>

:::

## Initial data loading

Use [Skeleton](/components/skeleton/skeleton) for the initial chart loading.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/skeleton.tsx';
</script>

:::

## Custom accessible text

You can set `a11yAltTextConfig` if you need accessible text that differs from the default one.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/cigarette-chart/custom-a11y.tsx';
</script>

:::
