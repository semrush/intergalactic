---
title: Examples
fileSource: d3-chart
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Area

- You can draw a chart with areas using the `Area` component.
- `Dots` are the dots on the line chart.
- As with the [Line chart](/data-display/line-chart/line-chart-d3-code/), you can draw a polyline or a smoothed chart by passing the required method to the curve property.

@example area

@## Edge cases

- If a part of the chart has no data – use a dashed line to draw that period.
- If the data has only one value – display it as a dot.
- Two consecutively known values will automatically be displayed as the `Area` component.

@example area-without-data

@## Custom line

@example area-custom-line

@## Interpolation

If exact values of specific point is not available, you can pass `interpolateValue` and value will be automatically interpolated.

> 🚨 Interpolation doesn't works with `StackedArea`.

@example area-interpolation

@## Legend

@example legend
