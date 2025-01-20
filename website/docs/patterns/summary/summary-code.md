---
title: Summary
tabs: Design('summary'), Example('summary-code')
---

## Basic usage

Display [Skeleton](/components/skeleton/skeleton) during initial data loading.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx';
</script>

:::

## Vertical layout with Mini chart

You have the option to arrange metrics vertically.

You can show [Mini charts](../../data-display/mini-chart/mini-chart.md) alongside metrics. Remember to set `aria-hidden`, or add a meaningful `aria-label`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx';
</script>

:::

## Summary with error

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-error.tsx';
</script>

:::
