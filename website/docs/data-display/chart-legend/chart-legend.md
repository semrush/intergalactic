---
title: Chart legend
fileSource: d3-chart
tabName: Design
docs: true
---

> Basic data visualization rules in widgets with charts are described in [Chart principles](/data-display/d3-chart).

@import playground

@## Description

**Chart legend** is a component that helps a user read the data presented on the chart.

Add legend to the chart if there are more than one dataset. If there is only one dataset on the chart, then don’t display the legend: in this case the purpose of the data should be clear from the chart context: chart title, description, etc.

@## Component composition

![](static/legend-composition.png)

Component consists of the following elements:

1. `ChartLegend.LegendItem`
2. `ChartLegend.LegendItem.Shape`
3. `ChartLegend.LegendItem.Label`

Optionally you can add the following to the LegendItem:

![](static/legend-optional-elements.png)

- Leading Icon
- Additional label
- Counter

<!-- @## Styles and margins

**The default margin between the legend items is 16px (`--spacing-4` token).**

If legend items are too long, move them to the second row. The spacing between the rows is 8px.

![](static/legenditem-margin.png) -->

@## Placement

The recommended placement of the legend is the top left position above the chart.

![](static/checkbox.png)

### Other placement options

In some cases, you can position the legend either below the chart on the left or to the right of the chart. Here are examples and some possible scenarios:

@table-caption Chart legend placement examples

| Placement | Appearance example  | Examples of cases |
| --------- | ------------------- | ----------------- |
| right     | ![](static/legend-right.png) ![](static/legend-right2.png) | When the chart is compact and doesn't take up much space or when you want to display legend items in a list for value comparisons. |
| bottom    | ![](static/legend-bottom.png) ![](static/legend-bottom2.png) | For instance, when there are multiple filters above the chart or when the chart adapts for smaller screens. |

@## Legend items

Legend items can be either interactive or static. Use `Checkbox` for interactive legend items and choose from a list of default SVG shapes (`Circle`, `Square`, `Line`) for static legend items. You can also set a custom shape if needed.

The colors of the checkboxes or shapes correspond to the data on the chart.

All legend items use `--text-primary` token for color of the text label.

@table-caption Legend item shapes

| Shape property           | Appearance example                   |
| ------------------------ | ------------------------------------ |
| `Checkbox` (interactive) | ![](static/checkbox.png)             |
| `Circle` (static)        | ![](static/static-legend-circle.png) |
| `Square` (static)        | ![](static/static-legend-square.png) |
| `Line` (static)          | ![](static/static-legend-line.png)   |

### Optional legend item elements

A legend item can include an icon, additional text, a counter, or a combination of these.

@table-caption Optional legend item elements

| Element       | Appearance example    | Styles   |
| ------------- | --------------------- | -------- |
| Leading icon  | ![](static/items-icon.png)      | Icon has M size and `--icon-non-interactive` color.   |
| Additional information | ![](static/items-info.png) | For additional information, use text with 14px size (`--fs-200`) and `--text-secondary` token for color. |
| Counter      | ![](static/items-counter.png)   | For a counter, use text with 14px size (`--fs-200`) and `--text-secondary` token for color.  |

Example of a combination of the elements above:

![](static/items-combination.png)

@## Trend and average value

To display the trend or average value in the legend, apply the `--chart-palette-order-total-amount` color token. Use a [Divider](/components/divider/) with `margin: 0 16px` to separate it from the main legend.

![](static/legend-trend.png)

@## Interaction

Hovering over a LegendItem can highlight the corresponding data on the chart by reducing the transparency of other data categories to 30%.

![](static/legend-hover.png)

If some data is already disabled in the legend, it should remain disabled while hovering.

![](static/legend-hover2.png)

@## Disabled legend

When all legend items are disabled, the chart should display the X-axis.

![](static/legend-turn-off.png)

@page chart-legend-api
@page chart-legend-code
@page d3-chart-changelog
