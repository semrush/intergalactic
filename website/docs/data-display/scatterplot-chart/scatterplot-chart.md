---
title: Scatterplot chart
fileSource: d3-chart
tabName: Guide
---

> 💡 Basic data visualization rules are described in the [Chart principles](/data-display/chart/).

@## Description

**Scatter plot chart** visualizes the relationship between two variables in one or more datasets.

This chart type helps to analyze patterns between two variables.

Unlike other types of charts, a scatter plot chart can display trends, clusters, patterns, and relationships in a dataset, especially very large ones. And they are useful for quick assessment of whether there is a dependency between the variables or not.

> The scatterplot is arguably the most versatile, polymorphic, and generally useful invention in the history of statistical graphics ( [Journal of the History of the Behavioral Sciences](http://onlinelibrary.wiley.com/doi/10.1002/jhbs.20078/abstract), 2005).

Use a scatter plot chart when you need to show the correlation between two variables in a large dataset.

@## Appearance

Scatter plot chart must contain:

- vertical lines (in addition to horizontal);
- labels for the X and Y axes (don't color them, as this will complicate the "reading" of the chart);
- a legend if the dataset has different categories, each with a different color.

@## UI/UX use

@## Axes

- Be sure to label both the X and Y axes.
- Don't color the axis labels in colors — this will make your chart harder to "read".

@## Always start the Y axis at 0

Otherwise, it can visually distort the presence of a correlation between the data along the Y and X axes.

@## Number of datasets

> 💡 The more datasets you cram into your scatterplot chart, the more difficult it will be to "read" it.

@## Useful

Scatter plots are used when you want to show the relationship between two variables. Scatter plots are sometimes called correlation plots because they show how two variables are correlated. In the height and weight example, the chart wasn’t just a simple log of the height and weight of a set of children, but it also visualized the relationship between height and weight - namely that weight increases as height increases. Notice that the relationship isn’t perfect, some taller children weight less than some shorter children, but the general trend is pretty strong and we can see that weight is correlated with height.

@page scatterplot-chart-api
@page scatterplot-chart-d3-code
