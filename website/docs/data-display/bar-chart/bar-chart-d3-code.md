---
title: D3 code
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

@example bar

@## Hover bar

The `<HoverRect/>` component draws a rectangle when hovering the cursor over a chart. It's similar to how the `<HoverLine/>` component works for the line chart.

@example hover-bar

@## Tooltip

You can add a tooltip to any element of a chart. The internal content can be easily identified with a function.

@example tooltip-bar

@## Date format

Use `scaleBand` when you need to display dates on one of the axes.

@example bar-date

@## Negative bar

The bar can also have negative values. For better readability, add an additional `XAxis` positioned at zero at the end.

@example bar-negative

@## Horizontal bar

You can rotate a chart using the `<HorizontalBar/>` component by swapping `scaleBand` and `scaleLinear`.

@example bar-horizontal

@## Label bar

To draw the values of the bars, pass the function to `<Bar/>` to receive all required values.

@example bar-label

@## Group bar

To combine multiple bars, use `<GroupBar/>` and `<GroupBar.Bar/>`.

> The `<GroupBar.Bar/>` component is a customized `<Bar/>` that has the same API.

@example bar-group

@## Horizontal group bar

To combine multiple horizontal bars, use `<GroupBar.HorizontalBar/>`.

> The `<GroupBar.HorizontalBar/>` component is a customized `<HorizontalBar/>` that has the same API.

@example bar-horizontal-group

@## Stacked bar

To draw a stacked chart, use `<StackBar/>` and `<StackBar.Bar/>`.

@example bar-stack

@## Horizontal stacked bar

To draw a horizontal stacked chart, use the `<StackBar.HorizontalBar/>` component.

@example bar-horizontal-stack

@## Trend line

You can combine charts with each other. For example, to display a trend line on a bar chart.

@example bar-trend

@## Background

Use the `<Bar.Background/>` and `<HorizontalBar.Background/>` components if you need to add a background to a chart plot.

@example bar-background
