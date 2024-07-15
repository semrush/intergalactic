---
title: Compact horizontal bar chart
fileSource: d3-chart
tabs: Design('bar-horizontal-compact'), A11y('bar-horizontal-compact-a11y'), API('bar-horizontal-compact-api'), Examples('bar-horizontal-compact-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
Basic data visualization rules are described in the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Compact horizontal bar chart** visualizes the distribution of values by category for a part-to-whole comparison.

## Usage

**Use Compact horizontal bar chart when:**

- Categories have or may have long names in localization.
- Interface is narrow, and you need to preserve horizontal space for other information.
- Comparing less than 10 categories.
- Each category's value needs labeling.
- Showing category distribution in the specific order.

![](static/hor-bar-compact-example.png)

**Avoid Compact horizontal bar chart when:**

- Displaying trends (use [Line chart](/data-display/line-chart/line-chart)).
- Showing data over time (use [Bar chart](/data-display/bar-chart/bar-chart) or [Line chart](/data-display/line-chart/line-chart)).

## Appearance

![](static/hor-bar-compact-chart.png)

## Grid and axes

This chart type does not need a grid.

## Category labels

- Labels use the primary text color (`--text-primary` token).
- Use `ellipsis` for long labels, with tooltips showing the full name.

![](static/hor-bar-compact-labels.png)

## Legend

Legend is unnecessary for a single-category bar chart; clear chart naming is usually enough.

For the case with multiple categories, add a legend.

![](static/hor-bar-compact-legend.png)

## Interaction

Hovering highlights a bar with `--chart-grid-bar-chart-hover`, indicating focus or clickability.

![](static/hor-bar-compact-hover.png)

## Edge cases

### No more results

Show "No more results" with the `--spacing-8x` margin below values and text with `--text-secondary` color. Refer to [Error & n/a widget states](/components/widget-empty/widget-empty) for all other empty states.

![](static/hor-bar-compact-no-more.png)

### Null values

If all values on the chart are zero, display zero in the tooltips.

::: tip
Zero counts as data. 0 ≠ n/a.
:::

![](static/hor-bar-compact-null.png)

### No data

Do not display value inside the bar for data points without values. When hovering over such bars, show a tooltip with the "n/a" value. Additionally, consider adding a message explaining the absence of data and providing information on when it will be available (if possible).

![](static/hor-bar-compact-na.png)

## Initial data loading

Show [Skeleton](/components/skeleton/skeleton) during initial loading. If the chart has a title, display it to inform users about what's loading. Refer to [Skeleton](/components/skeleton/skeleton) for more details.

Use the `--skeleton-bg` color token for the skeleton's background.

![](static/hor-bar-compact-skeleton.png)

Refer to [Error & n/a widget states](/components/widget-empty/widget-empty) for all other empty states.

## Usage in UX/UI

See detailed information in the [Bar chart guide](/data-display/bar-chart/bar-chart#usage-in-ux-ui).
