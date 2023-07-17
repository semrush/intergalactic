---
title: Examples
fileSource: d3-chart
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Scale

You must pass a scale with a specified `domain`, `range` does not need to be specified as it is calculated automatically.
You can modify the range or use a non-linear scale.

@example scale

@## Color

You can change the color by passing the `color` property to the `<Radar.Polygon/>`.
It is also possible to pass the 'color' property to `<Radar.Polygon.Line/>` and `<Radar.Polygon.Dots/>`.

@example color

@## Background color

You can use the `fill="transparent"` property to make polygons transparent.

@example fill

@## Label long

If your labels are too long, you can move them to the next line using the line break symbol `\n`.

@example label-long

@## Label custom

If you need a custom React component instead of a label, you can change the display in the render function.

@example label-custom

@## Tooltip

You need to use the `<Radar.Tooltip />` component to add interactivity.

@example tooltip

@## Circle

To make the chart round, you need to pass the parameter `type="circle"`.
You can also round the polygons by passing the "curve" parameter from D3 into them.

@example curve

@## Tick size

To change the distance between the grid lines, you need to change the value of the `tickSize` parameter.

@example tick-size

@## Rotated

To change base angle of the chart, set `angleOffset` (in radians) parameter.

@example rotate
