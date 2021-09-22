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

@## Group bar

To combine multiple bars, use `<GroupBar/>` and `<GroupBar.Bar/>`.

> The `<GroupBar.Bar/>` component is a customized `<Bar/>` that has the same API.

@example bar-group

@## Stacked bar

To draw a stacked chart, use `<StackBar/>` and `<StackBar.Bar/>`.

@example bar-stack

@## Trend line

You can combine charts with each other. For example, to display a trend line on a bar chart.

@example bar-trend
