---
title: D3 code
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

@## Stacked bar chart

To draw a stacked chart, use `<StackBar/>` and `<StackBar.Bar/>`.

@example bar-stack
