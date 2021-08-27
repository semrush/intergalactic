---
title: Chart legend
fileSource: chart
tabName: Guide
---

> 💡 General information on data visualization is presented in [Data Visualization](/data-display/conception/).

@## Description

**Legend** is a block that helps the user navigate the data presented on the chart.

> **For most charts, the legend's priority position is in the top left part of the chart.**

For charts with a large number of controls, place the legend in the left bottom part under the graph.

@## Legend types

The legend can be clickable or non-clickable (static).

The following are the examples of using different types of legend in widgets with graphs.

@## Clickable legend

A [group of checkboxes](/components/checkbox/) with specified colors is most often used as a clickable legend. [Radio buttons](/components/radio/) are used infrequently.

| Component                                     | Apperance example                                                                                      | Styles                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Checkbox                                      | ![checkbox legend](static/checkbox.png) ![checkbox bottom legend](static/legend-bottom.png)            | Checkbox size M, `$gray20`, `text-padding: 4px;`, Icon size XS, additional information and counter — text 12px, `$gray60` |
| Checkbox with icon                            | ![checkbox legend](static/checkbox-icon.png)                                                           |                                                                                                                           |
| Checkbox with icon and additional information | ![checkbox legend](static/checkbox-icon-info.png) ![checkbox legend](static/checkbox-trash-bottom.png) |                                                                                                                           |
| Checkbox with counter                         | ![checkbox legend](static/checkbox-counter.png)                                                        |                                                                                                                           |
| Radio button                                  | ![radio legend](static/radio.png)                                                                      | Radio size M, `$gray20`, `text-padding: 4px;`                                                                             |

@## Legend with trend/average value

For the trend or average value in the legend, use the `--var(wall)` color for the checkbox. At the same time, we must separate it from the main legend with a [divider](/components/divider/) with `margin: 0 16px`.

![checkbox total legend](static/trend.png)

@## Non-clickable legend (static)

A static legend is a circle of the same size as the checkbox in the clickable legend. This legend does not disable the lines on the chart.

| Component               | Apperance example                        | Styles                                                                        |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| Static circle with text | ![line legend](static/static-legend.png) | Size — `12px * 12px`, text 12px (`--fs-100`), `$gray20`, `text-padding: 4px;` |

@## Interaction

By hovering on the checkbox, we will highlight the data on the chart by changing the transparency of the lines to 50% for the rest of the data categories.

![legend hover](static/legend-hover.png)

If we disabled some data in the legend, then the data on the chart doesnэt change its transparency.

![legend hover](static/legend-hover2.png)

@## Disabled legend

If you disable all legend checkboxes, the chart should display the X-axis.

![turn off legend](static/legend-turn-off.png)

@page chart-legend-api
@page chart-legend-code
