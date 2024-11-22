---
title: Summary
tabs: Design('summary'), Example('summary-code')
---

## Basic example

Display [Skeleton](/components/skeleton/skeleton) during initial data loading.

::: sandbox

<script lang="tsx">
  export Demo from './examples/default-summary-example.tsx';
</script>

:::

## Vertical layout with Mini chart

You have the option to arrange metrics vertically.

You can show [Mini charts](../../data-display/mini-chart/mini-chart.md) alongside metrics. Remember to set `aria-hidden`, or add a meaningful `aria-label`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/summary-with-minitrend.tsx';
</script>

:::

## Summary with error

::: sandbox

<script lang="tsx">
  export Demo from './examples/summary-with-error.tsx';
</script>

:::
