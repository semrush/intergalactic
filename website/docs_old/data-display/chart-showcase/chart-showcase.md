---
title: Charts showcase
fileSource: d3-chart
tabName: Design
docs: true
---

There are various chart types within the Intergalactic Design System, each designed for distinct scenarios and data representation.

- [Grid & axes](/data-display/d3-chart/#grid_and_axes)
- [Chart tooltip](/data-display/d3-chart/#tooltip)
- [Chart legend](/data-display/chart-legend/)

> Note that some chart types are still under development and are not yet clickable.

@## Comparison

This chart type is used to compare values within a list that has no specific order.

_For instance, you can compare the audience of selected domains to the overall market._

@import chart-group {"group": ["bar", "histogram", "horizontalBar", "areaStacked", "donut", "radar", "bubble", "lollipop"]}

@## Ranking

Rank items in either ascending or descending order based on their values.

_For example, you can rank countries by their market share._

@import chart-group {"group": ["bar", "histogram", "horizontalBar", "line", "lollipop"]}

@## Change over time (Trend)

This chart type visualizes how values change over time.

_For instance, it can be used to display the traffic trend over time for various devices._

@import chart-group {"group": ["line", "area", "areaStacked", "bar", "barStacked", "histogram", "stackedHistogram", "heatmap", "lollipop"]}

@## Part to whole

Use this chart to illustrate the contribution of individual values to the whole.

_For example, it's useful for showing the traffic share of different devices._

@import chart-group {"group": ["donut", "barStacked", "stackedHistogram", "stackedHorizontalBar", "areaStacked", "funnel"]}

@## Distribution

This chart type depicts the distribution within a set of values.

_For instance, you can use it to show the distribution of leaders, niche players, and game changers in the market._

@import chart-group {"group": ["histogram", "stackedHistogram", "area", "areaStacked", "scatterplot", "bubble", "radar", "heatmap", "lollipop", "polar", "quadrant", "alluvial"]}

@## Correlation

Employ this chart to demonstrate the relationship between two or three sets of values.

_For example, it can show how website traffic is influenced by customer age._

@import chart-group {"group": ["venn", "scatterplot", "radialTree", "heatmap", "kagi", "alluvial"]}

@## Deviation

Use this chart to visualize the deviation, difference, or gap between two sets of values.

_For example, it can illustrate the deviation between the actual and target audience of a website._

@import chart-group {"group": ["bar", "histogram", "area", "areaStacked", "scatterplot", "radar", "lollipop"]}

@## Geographical values

Utilize a map to represent values associated with geographical areas.

_For instance, you can display website audience by country or region on a map._

@import chart-group {"group": ["choroplethMap"]}

@page d3-chart-changelog
