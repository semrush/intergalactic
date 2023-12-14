---
title: Bar chart
fileSource: d3-chart
tabs: Design('bar-chart'), Vertical bar chart('bar-chart-vertical'), A11y('bar-chart-a11y'), API('bar-chart-api'), Examples('bar-chart-d3-code'), Changelog('d3-chart-changelog')
---

## Description

**Vertical bar chart helps you compare data when**:

- Time change shall be used when you need to focus on the value of each point, rather than on the trend. _For example, achieving a goal in a specific month, or increasing or decreasing the audience on a specific day._
- Compare different categories with each other.

::: tip
Important! Consider [horizontal bar chart](/data-display/bar-horizontal/bar-horizontal) for this task first. It is easier to fit the category names in the columns.
:::

![](/data-display/bar-chart/static/example-2.png)

![](/data-display/bar-chart/static/example-3.png)

## Appearance

| Number of categories | Appearance example                                                                         | Styles                                                        |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| One                  | ![](/data-display/bar-chart/static/bar-chart.png)     | The upper part of the column shall have `border-radius: 2px`. |
| Two                  | ![](/data-display/bar-chart/static/bar-chart-2.png) | The margin between two columns is 4px.                        |

::: tip
If there are more than 3-4 categories, use a [stacked bar chart](/data-display/stacked-bar-chart/stacked-bar-chart) or try to present the data using a different type of chart.

It is also a good solution to allow users to switch the chart type in the widget settings.
:::

![](/data-display/bar-chart/static/stacked-bar-chart.png)

## Interaction

See detailed information in the common [Bar chart guide](/data-display/bar-chart/bar-chart#a61ee5/).

## Edge cases

Here you will find the states for some specific cases. All other "empty states" for widgets are specified in [Error & n/a widget states](/components/widget-empty/widget-empty).

### One dot with a data

![](/data-display/bar-chart/static/one-dot-bar-chart.png)

### Two dots with a data

![](/data-display/bar-chart/static/two-dots.png)

### Null values

If all the values on the chart are zero, then in the tooltip we shall display null all of them in the tooltips.

::: tip
**Zero is also data. 0 ≠ `n/a`.**
:::

![](/data-display/bar-chart/static/null-bar-chart.png)

### Some dots have no data

Don’t display columns for the dots without data.

When you hover over a dot without data, show tooltip with the `n/a` value. We also recommend you to add a message, which explains why there is no data, and when it will be available (if possible).

![parially](/data-display/bar-chart/static/partially-trash.png)

## Initial loading

When the chart is loading for the first time, show [Skeleton](/components/skeleton/skeleton) instead of the chart.

If the chart has a title, show it during loading. The user will have an idea of what is being loaded and whether they need to wait for the loading process to complete.

For more information about this state, refer to [Skeleton](/components/skeleton/skeleton).

Use the `--skeleton-bg` color token for the skeleton background color.

Use the `--skeleton-bg` color token for the skeleton background color.

![](/data-display/bar-chart/static/bar-vertical-skeleton.png)
