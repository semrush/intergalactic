---
title: D3 example
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Horizontal bar

You can rotate a chart using the `<HorizontalBar/>` component by swapping `scaleBand` and `scaleLinear`. See more about `scaleBand` and `scaleLiner` in the [Bar chart guide](/data-display/bar-chart/bar-chart-d3-code/#addc35).

@example bar-horizontal

@## Label bar

To draw the values of the bars, pass the function to `<Bar/>` to receive all required values.

@example bar-label

@## Horizontal group bar

To combine multiple horizontal bars, use `<GroupBar.HorizontalBar/>`.

> The `<GroupBar.HorizontalBar/>` component is a customized `<HorizontalBar/>` that has the same API.

@example bar-horizontal-group

@## Background

Use the `<Bar.Background/>` and `<HorizontalBar.Background/>` components if you need to add a background to a chart plot.

@example bar-background
