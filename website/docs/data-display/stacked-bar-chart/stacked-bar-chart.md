---
title: Stacked bar chart
fileSource: d3-chart
tabName: Design
---

> 💡 Basic data visualization rules are described in the [Chart principles](/data-display/chart/).

@## Description

**Stacked bar chart** is used when it's necessary to display more than two categories of values and show the ratio of them to the whole.

Important points to keep in mind when presenting data as a Stacked bar chart:

1. Use this chart type if you have more than two categories to compare.
2. Use this chart type to visualize the ratio of parts to the whole.
3. Use sufficiently contrasting colors to show different parts more clearly.
4. Don't make this chart too small in height and width – it will make it harder to read data.

@## Appearence

Stacked bar chart has no margin between values inside the column. **Choose contrasting colors for different categories.**

> It is recommended to make a minimum 20% margin between a bars. This is necessary so that the data does not turn into a mess.

![stacked bar chart](static/stacked-bar-chart.png)

### Chart colors

Use [chart palette](/data-display/chart-palette/) and follow the rules prescribed for it.

@## Interaction

When you hover over a column, highlight it with `--gray-200` color with .3 opacity. The hover takes up half of the margin column on the right and left sides.

If the column is clickable, the cursor changes to `pointer`.

![stacked bar chart](static/stacked-bar-chart-hover.png)

See detailed information in the common [Bar chart guide](/data-display/bar-chart/#a61ee5/).

@## Trend

In some cases, a stacked bar chart may have a trend line. Most often, trend line overloads charts. However, in some cases, it can be useful for reading the overall trend. It helps to focus on the total value of each dot.

When you hover over any part of the bar, display the tooltip with the values for all categories and the total value.

![stacked bar chart](static/stacked-bar-chart-trend.png)

@## Edge cases

Edge cases for Stacked bar chart are pretty much the same as [Bar chart](/data-display/bar-chart/bar-chart-vertical/#a54381) has.

@## Initial loading

See detailed information in the section about data loading in the [Bar chart guide](/data-display/bar-chart/bar-chart-vertical/#ac26f2).

@## Use in UX/UI

See detailed information in the [Bar chart guide](/data-display/bar-chart/#a1d837).

@page stacked-bar-chart-api
@page stacked-bar-chart-d3-code
@page stacked-bar-chart-recharts-code
