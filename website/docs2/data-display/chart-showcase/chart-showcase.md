---
title: Charts showcase
fileSource: d3-chart
tabName: Design
docs: true
---

We use many types of charts in the interface. Each of them is designed to visualize different cases and data.

- [Grid & axes](/data-display/d3-chart/#grid_and_axes)
- [Chart tooltip](/data-display/d3-chart/#tooltip)
- [Chart legend](/data-display/chart-legend/)

> Note that some chart types are in the development yet (they aren't clickable).

## Comparison

Compare values of items in a list that has no particular order.

_For example: Compare audience in a list of selected domains versus the whole market._

@import chart-group {"group": ["bar", "histogram", "horizontalBar", "areaStacked", "donut", "radar", "bubble", "lollipop"]}

## Ranking

Rank items from highest to lowest, or vice versa.

_For example: Rank countries by market share._

@import chart-group {"group": ["bar", "histogram", "horizontalBar", "line", "lollipop"]}

## Change over time (Trend)

Show the variation of values over time.

_For example: Show the traffic trend over time for different devices._

@import chart-group {"group": ["line", "area", "areaStacked", "bar", "barStacked", "histogram", "stackedHistogram", "heatmap", "lollipop"]}

## Part to whole

Display the contribution of individual values to the whole.

_For example: Show the traffic share for different devices._

@import chart-group {"group": ["donut", "barStacked", "stackedHistogram", "stackedHorizontalBar", "areaStacked", "funnel"]}

## Distribution

Show the distribution within a set of values.

_For example: Show the distribution of leaders, niche players and game changeres in the market._

@import chart-group {"group": ["histogram", "stackedHistogram", "area", "areaStacked", "scatterplot", "bubble", "radar", "heatmap", "lollipop", "polar", "quadrant", "alluvial"]}

## Correlation

Show the correlation between two or three sets of values.

_For example: Show how website traffic are impacted by customer age._

@import chart-group {"group": ["venn", "scatterplot", "radialTree", "heatmap", "kagi", "alluvial"]}

## Deviation

Show the deviation, difference, or gap between two sets of values.

_For example: Show the deviation between actual and target audience of the website._

@import chart-group {"group": ["bar", "histogram", "area", "areaStacked", "scatterplot", "radar", "lollipop"]}

## Geographical values

Use a map to show the values associated with geographical areas.

_For example: Show website audience by country or region on a map._

@import chart-group {"group": ["choroplethMap"]}

@page d3-chart-changelog
