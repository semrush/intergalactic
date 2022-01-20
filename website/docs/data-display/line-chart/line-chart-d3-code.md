---
title: D3 example
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Line

- Line charts are displayed using the `Line` component.
- `Dots` are the dots on the line chart.

@example line

@## Hover line

- The `HoverLine` component is responsible for the hover effect. Use it with line charts.
- You can set the orientation of the component using the `vertical` and `horizontal` properties.

@example hover-line

@## Tooltip

You can add a tooltip to any element of a chart. The internal content can be easily identified with a function.

@example tooltip-line

@## Time

Use `scaleTime` for calculating intermediate date values. See the [d3 Time Scales documentation](https://github.com/d3/d3-scale#time-scales) for more information.

> If you already have the tick values, you can use `scaleLine`.

@example line-time

@## Curve

To get smoothed lines, you need to transfer curve with the required rounding method to the chart. You can find all available methods in the [d3 Curves documentation](https://github.com/d3/d3-shape#curves).

@example line-curve
