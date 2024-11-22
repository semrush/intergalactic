---
title: Summary
tabs: Design('summary'), Example('summary-code')
---

## Default summary example

::: sandbox

<script lang="tsx">
  export Demo from './examples/default-summary-example.tsx';
</script>

:::

## Vertical layout with skeleton

In case your report layout demands it, you have the option to vertically arrange the metrics. To enhance user experience during the initial data retrieval, consider displaying [Skeleton](/components/skeleton/skeleton).

::: sandbox

<script lang="tsx">
  export Demo from './examples/vertical-layout.tsx';
</script>

:::

## Summary with minitrend

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
