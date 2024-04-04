---
title: Cigarette chart
fileSource: d3-chart
tabs: Design('cigarette-chart'), A11y('cigarette-chart-a11y')
---

::: tip
Basic data visualization rules are described in the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Cigarette chart** shows parts of a whole by dividing a bar into proportional segments. Each segment represents a fraction, and the entire bar represents the total sum, always equaling 100%. Basically it serves the same function as [Donut chart](/data-display/donut-chart/donut-chart) does.

**Key points for using cigarette chart:**

- Cigarette charts are best for highlighting category proportions, not exact values.
- It can only show a few values clearly. With more values, segments become too small to be effective. For more than 5 categories, consider another chart type, like a [Bar chart](/data-display/bar-chart/bar-chart).

## Appearance

Values are displayed from left to right direction. The gap between values is 1px.

![](static/cigarette-gap.png)

### Layout

Chart can be displayed using horizontal or vertical layout.

![](static/cigarette-layout-horizontal.png)

![](static/cigarette-layout-vertical.png)
