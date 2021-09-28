---
title: Vertical bar chart
---

@## Description

**Vertical bars help you compare data**:

- Time change shall be used when you need to focus on the value of each point, rather than on the trend. _For example, achieving a goal in a specific month, or increasing or decreasing the audience on a specific day._

![bar chart example](/data-display/bar-chart/static/example-2.png)

![bar chart example](/data-display/bar-chart/static/example-3.png)

- Compare different categories with each other.

> 💡 Important! Consider horizontal columns for this task first. It is easier to fit the category names in the columns.

@## Appearance

|                | Apperance example                                                       | Styles                                                        |
| -------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| One category   | ![bar-chart one value](/data-display/bar-chart/static/bar-chart.png)    | The upper part of the column shall have `border-radius: 2px;` |
| Two categories | ![bar-chart two values](/data-display/bar-chart/static/bar-chart-2.png) | The margin between two columns is 4px.                        |

> 💡 If there are more than 2-3 categories, the researchers recommend using a [stacked bar chart](/data-display/stacked-bar-chart/) or try to present the data using a different type of chart.
>
> It is also a good solution to allow users to switch the chart type in the widget settings.

@## Interaction

When you hover over a column, we highlight it with a grey background – `rgba 152 170 175, 0.3` (`$mist` with .3 opacity). The hover takes up half of the margin column on the right and left sides.

> 💡 If the column is clickable, the cursor must change to `pointer`.

If the chart has a trend line, then while hovering a line and a point shall be displayed on the trend line.

|                                   | Appearance example                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Chart with one category           | ![bar chart with hover](/data-display/bar-chart/static/bar-chart-hover.png)                  |
| Chart with two or more categories | ![bar chart with two values and hover](/data-display/bar-chart/static/bar-chart-2-hover.png) |

@## Edge cases

Here you will find the states for one, two, zero, and fractional values. All other common ["empty states" for widgets](/components/widget-empty/) are contained on a separate page.

### Data only for one point is available

![one dot](/data-display/bar-chart/static/one-dot.png)

### Data only for two points is available

![two dots](/data-display/bar-chart/static/two-dots.png)

### All values are zero

If all the values on the chart are zero, then in the tooltip we shall display O for this point.

> 💡 **Zero is also data. 0 ≠ `n/a`.**

![null data](/data-display/bar-chart/static/null.png)

### A part of the chart contains no data

Do not display columns in the area without data.

When you hover over a point without data, the tooltip with the `n/a` value for the point shall appear. It is recommended to specify in the tooltip why there is no data, and when it will be available (if possible).

> 💡 **When there is no data, you can't draw a zero line. Zero is also data. 0 ≠ `n/a`.**

![partially data](/data-display/bar-chart/static/partially-trash.png)

@## Data loading

Display [Skeleton](http://i.semrush.com/components/skeleton/) in the place of the chart. If the chart has a title, it should be displayed during loading. The user shall have an idea of what is being loaded and whether they need to wait for the loading process to complete.

Styles can be found in the guide book for [Skeleton](http://i.semrush.com/components/skeleton/).

![skeleton](/data-display/bar-chart/static/skeleton.png)
