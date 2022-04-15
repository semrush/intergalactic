---
title: Vertical bar chart
---

@## Description

**Vertical bar chart helps you compare data**:

- Time change shall be used when you need to focus on the value of each point, rather than on the trend. _For example, achieving a goal in a specific month, or increasing or decreasing the audience on a specific day._

![bar chart example](/data-display/bar-chart/static/example-2.png)

![bar chart example](/data-display/bar-chart/static/example-3.png)

- Compare different categories with each other.

> 💡 Important! Consider horizontal columns for this task first. It is easier to fit the category names in the columns.

@## Appearance

| Number of categories | Appearance example                                                                         | Styles                                                         |
| -------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| One                  | ![bar chart with one category of values](/data-display/bar-chart/static/bar-chart.png)     | The upper part of the column shall have `border-radius: 2px;`. |
| Two                  | ![bar chart with two categories of values](/data-display/bar-chart/static/bar-chart-2.png) | The margin between two columns is 4px.                         |

> 💡 If there are more than 2-3 categories, use a [stacked bar chart](/data-display/stacked-bar-chart/) or try to present the data using a different type of chart.
>
> It is also a good solution to allow users to switch the chart type in the widget settings.

![bar chart with more than two categories of values](/data-display/bar-chart/static/stacked-bar-chart.png)

@## Interaction

When you hover over a column, we highlight it with `--gray-200` color with .3 opacity. The hover takes up half of the margin column on the right and left sides.

If the column is clickable, the cursor changes to `pointer`.

If the chart has a trend line, then while hovering a line and a point shall be displayed on the trend line.

|                                   | Appearance example                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Chart with one category           | ![bar chart with hover](/data-display/bar-chart/static/bar-chart-hover.png)                  |
| Chart with two or more categories | ![bar chart with two values and hover](/data-display/bar-chart/static/bar-chart-2-hover.png) |

@## Edge cases

Here you will find the states for some specific cases. All other common ["empty states" for widgets](/components/widget-empty/) are contained on a separate page.

### One dot with a data

![one dot](/data-display/bar-chart/static/one-dot.png)

### Two dots with a data

![two dots](/data-display/bar-chart/static/two-dots.png)

### All values are zero

If all the values on the chart are zero, then in the tooltip we shall display null all of them in the tooltips.

> 💡 **Zero is also data. 0 ≠ `n/a`.**

![null data](/data-display/bar-chart/static/null.png)

### Some dots have no data

Do not display columns for the dots without data.

When you hover over a dot without data, show tooltip with the `n/a` value. We also recommend you to add a message, which explains why there is no data, and when it will be available (if possible).

![partially data](/data-display/bar-chart/static/partially-trash.png)

@## Initial loading

When loading the chart for the first time, show [Skeleton](/components/skeleton/) instead of the chart.

If the chart has a title, show it during the loading. The user shall have an idea of what is being loaded and whether they need to wait for the loading process to complete.

More information about this state see in the guide for [Skeleton](/components/skeleton/).

![skeleton](/data-display/bar-chart/static/skeleton.png)
