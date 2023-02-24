---
title: Radar chart
fileSource: d3-chart
tabName: Design
---

> Basic data visualization rules are described in the [Chart principles](/data-display/chart/).

**Radar chart** is a chart for displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.

It is designed to show similarities, differences, and outliers, or any other item of interest at a glance.

> The radar chart is also known as web chart, spider chart, spider graph, spider web chart, star chart, star plot, cobweb chart, irregular polygon, polar chart, or Kiviat diagram. It is equivalent to a parallel coordinates plot, with the axes arranged radially.

**Use radar chart when:**

- There are multivariate data.
- There is an arbitrary number of variables.
- You need to show outliers.
- You need to make comparisons across multivariate data.
- Data sets are small or moderately sized.

Radar charts are at their best when used to quickly compare multiple dimensions in a compact space. They can be attention-grabbing, due both to their circular structure and their relative novelty compared to other business graphs, so they can be effective when you need to visually engage your audience. A general audience might find them confusing or intimidating to read without additional guidance (which you can provide—we’ll talk more about that in a later section), but technical audiences might find them intriguing.

> Instead of the radar chart, you can use the parallel coordinates chart. This chart "unwinds" the same data into a straight line, which can make the comparisons across data easier to see.

### Advantages of radar charts

**Outliers and similarities are easy to see**

The most significant advantage of using a radar chart is that outliers are immediately visible. Any metric or variable that is vastly different from the others on the chart or in a set of charts is obvious. Commonalities are also easy to assess, particularly if they are plotted on the same chart.

### Disadvantages of radar charts

Data visualization specialists often criticize radar charts—for example, in this scottlogic.com blog post and in this article on perceptualedge.com. 

Their main cons are:

- Hard to judge radii length.
- Radar charts can distort data.
- Radar charts can create connections where there are none.
- Radar charts can cause occlusion and confusion.

> Additionally, humans recognize and can discern data in shapes like squares, circles, and triangles. Therefore, from a psychological standpoint, the random nature of radar chart shapes makes them less useful than known and quantifiable shapes.

@## Appearance

### Axes and variables

Variables usually start at 0 degrees and divide the grid into equal parts.

Radar charts are most beneficial when there are a few items to compare. That is why we recommend showing 3-10 variables for your data sets.

You can turn off axes and variables if needed. It's especially helpful for small-sized charts.
