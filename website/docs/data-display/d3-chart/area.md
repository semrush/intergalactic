---
title: Area chart
---

@## Area

- You can draw a chart with areas using the `Area` component.
- `Dots` are the dots on the line chart.
- As with the [Line chart](/data-display/d3-chart/line/), you can draw a polyline or a smoothed chart by passing the required method to the `curve` property.

@example area

@## Stacked area

If you need to display a part-to-whole ratio — use the `<StackedArea/>` and `<StackedArea.Area/>` components.

@example stacked-area

@## Edge cases

- If a part of the chart has no data — use a dashed line to draw that period.
- If the data has only one value — display it as a dot.
- Two consecutively known values will automatically be displayed as the `Area` component.

@example area-without-data

The `StackedArea` component has the same logic.

@example stacked-area-without-data
