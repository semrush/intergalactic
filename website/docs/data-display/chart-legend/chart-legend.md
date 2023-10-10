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

Add legend to the chart if there are more than one dataset. If there is only one data set on the chart, then don’t display the legend: in this case the purpose of the data should be clear from the chart context: chart title, description, etc.

@## Styles and margins

**The margin between the legend items is 16px.**

If legend items are too long, move them to the second row. The spacing between the rows is 8px.

@## Placement

**The recommended placement of the legend is the top left position above the chart.** However, in some cases (for example, two charts under each other with one hover, or a lot of filters over the chart), place the legend to the left bottom under the chart.

@## Legend items

Legend items can be [checkboxes](/components/checkbox/) or custom shapes. The checkboxes or shapes colors match the data on the chart. In addition to the checkbox/shape and text label, the legend item can also contain an icon and/or counter.

### Checkbox legend items

For an interactive legend use a group of [checkboxes](/components/checkbox/) with specified colors.

@table-caption Checkboxes in the chart legend

| Component                                     | Appearance example                                                                                     | Styles                                                                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkbox                                      | ![](static/checkbox.png) ![](static/legend-bottom.png)            | Checkbox has M size. Text has 14px size (`--fs-200`) and `--text-primary` token for color.                                                                                                   |
| Checkbox with icon                            | ![](static/checkbox-icon.png)                                                           | Icon has M size and usually `--icon-non-interactive` color.                                                                                                                                  |
| Checkbox with icon and additional information | ![](static/checkbox-icon-info.png) ![](static/checkbox-trash-bottom.png) | Icon has M size and usually `--icon-non-interactive` token for color. For an additional information and counter use text with 14px size (`--fs-200`) and `--text-secondary` token for color. |
| Checkbox with counter                         | ![](static/checkbox-counter.png)                                                        | For a counter use text with 14px size (`--fs-200`) and `--text-secondary` token for color.                                                                                                   |

### Shape legend items

Don't forget to add description here!

@table-caption Shapes as legend items

| Appearance example                                  | Styles                                                                                               |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![](static/static-legend.png) | Circle has `12px * 12px` size. Text has 14px size (`--fs-200`) and `--text-primary` token for color. |

@## Trend and average value

To show the trend or average value in the legend, use the `--chart-palette-order-total-amount` token for color. At the same time, we must separate it from the main legend with a [divider](/components/divider/) with `margin: 0 16px`.

![](static/legend-trend.png)

@## Interaction

By hovering on the checkbox, highlight the data on the chart by changing the transparency of the lines to 30% for the rest of the data categories.

![](static/legend-hover.png)

If some data is already disabled in the legend, then this data remains disabled while hovering on the legend.

![](static/legend-hover2.png)

@## Disabled legend

If you disable all legend checkboxes, the chart should display the X-axis.

![](static/legend-turn-off.png)

@page chart-legend-api
@page chart-legend-code
@page d3-chart-changelog
