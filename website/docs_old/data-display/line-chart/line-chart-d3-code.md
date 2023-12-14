---
title: Examples
fileSource: d3-chart
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Basic usage

@example base

@## Line

- Line charts are displayed using the `Line` component.
- `Dots` are the dots on the line chart.

@example line

@## Line with area

- You must define `y0` and `y1` in `Line.Area` props and in the `data`.

@example line-with-area

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

@## Legend

@example legend

@## Interpolation

If exact values of specific point is not available, you can pass `interpolateValue` and value will be automatically interpolated.

@example line-interpolation
