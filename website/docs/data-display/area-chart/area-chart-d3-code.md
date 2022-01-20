---
title: D3 example
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Area

- You can draw a chart with areas using the `Area` component.
- `Dots` are the dots on the line chart.
- As with the [Line chart](https://i.semrush.com/data-display/line-chart/line-chart-d3-code/), you can draw a polyline or a smoothed chart by passing the required method to the curve property.

@example area

@## Edge cases

- If a part of the chart has no data — use a dashed line to draw that period.
- If the data has only one value — display it as a dot.
- Two consecutively known values will automatically be displayed as the `Area` component.

@example area-without-data
