---
title: Summary
tabName: Design
---

@## Description

**Summary** is a pattern for displaying summary metrics and trends in the report or tool.

**Use it to:**

- show user the main metrics of the report;
- display the main metric or metrics for data in a widget, table or somewhere else.

### Basic principles of using Summary

- It should be clear from the title and/or additional information nearby what the metric means. And it's useful when you can add information about how the metric is calculated.
- Display no more than 5-6 metrics on a report or in a widget. Thus, you will both reduce the cognitive load for the user.

@## Pattern composition

Pattern consists of:

- metric's title;
- additional information about date, period, location or database of the data;
- metric;
- additional information related to the metric (difference in values for a certain period, trend, etc. optional information).

![summary scheme](static/summary-metric.png)

@## Margins and paddings

The common version of the summary metric:

![summary Margins and paddings](static/margins-paddings.png)

If the metric consists of several others, so use these margins:

![summary Margins and paddings](static/margins-paddings2.png)

@## Styles

![default styles example](static/default-example.png)

|                                     | Styles                                                                                                                                                                                                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**                           | Text 14px (`--fs-200; --lh-200;`) with `--gray-800` color. `Info` icon with M size. Or you can use M size icon if you need to display some brand metrics (eg., for social media)..                                                                               |
| **Date/period/location/database**   | Text 12px (`--fs-100; --lh-100;`) with `--gray-500` color.                                                                                                                                                                                                       |
| **Metric**                          | Text 24px (`--fs-500; --lh-500;`) with `--gray-800` color or link color or some other color you use to show certain metrics in your product. Or you can make the text smaller (20px) or bigger (32px) if needed. See the [Typography scale](/style/typography/). |
| **Metric's additional information** | Text 12px (`--fs-100; --lh-100;`) with `--gray-500` color.                                                                                                                                                                                                       |
| **Other information**               | Text 12px (`--fs-100; --lh-100;`) with `--gray-500` color.                                                                                                                                                                                                       |

@## Dividers

- Separate metrics with 24px margins and [Divider](/components/divider/).
- The last metric (last-child element) has no divider.

![divider](static/divider.png)

### Dividers between one-group metrics

Sometimes you need to group the metrics. In this case, don't separate metrics related to the one group with the divider.

![dividers](static/dividers.png)

@## Horizontal & vertical layout

- The main metrics of the report/widget can be placed both horizontally and vertically, if required by the report layout.
- The vertical layout is more compact and saves space.

| Condition                                            | Layout type                                   | Appearance example                          |
| ---------------------------------------------------- | --------------------------------------------- | ------------------------------------------- |
| If there are more than 3 metrics in the interface -> | use horizontal layout                         | ![horizontal layout](static/horizontal.png) |
| If there are 3 or less metrics in the frontend ->    | vertical layout                               | ![vertical layout](static/vertical.png)     |
| If there is one metric in the interface, than ->     | show the values of which this metric consists | ![one-metric layout](static/one-metric.png) |

![metric consists of several others](static/metric-yes-no.png)

@## Alignment

Metrics can be placed not only in separate widgets, but also inside the table cells and other components. Thus, the alignment of the metric and its additional information can be both left and right.

![right alignment layout](static/right-align.png)

@## Title

- If there are a lot of metrics and they do not fit into the page width, collapse their title into `ellipsis`.
- Show the full title of the metric while hovering the title in the tooltip. You can also duplicate the title in the `Info` icon tooltip.

![summary title](static/minitrend3.png)

@## Difference value

- Don't show the metric's title in the tooltip, because we already have it in the summary.
- While hovering diff value, show the tooltip with the previous and current value next to the metric. Do not abbreviate the values in the tooltip.
- You can show both absolute and relative values inside the tooltip if needed.

![tooltip with difference value](static/diff.png) ![tooltip with difference value](static/diff2.png)

@## Summary with minitrends

Minitrends is a shortcut version of charts for displaying a trend, comparing a metric on different days, etc.

![minitrend](static/minitrend1.png)

| Case                                                                                                                            | Appearance example                  |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| If the metrics do not fit into the maximum page width, arrange the data in a column — **move the minitrends under the metric.** | ![minitrend](static/minitrend2.png) |
| If your metrics use the same type of minitrends (for example, linear), make them the same width.                                | ![minitrend](static/minitrend1.png) |

### Tooltip

Show tooltips with values while hovering over the minitrend if necessary.

![minitrend tooltip](static/minitrend-tooltip.png)

### Clickable minitrend

You can "hide" more detailed information (a whole widget with a full chart, for example) in the minitrend and make it clickable if:

- there is no need to show all charts at the same time;
- user flow does not provide for frequent analysis of charts.

#### Important tips

- The default period of the minitrend and the detailed chart must coincide.
- Changing the period on the chart visually does not affect the minitrend in the metric.

#### Mechanics

- By default, any of the clickable minitrend charts is shown as user opens the report.
- The detailed chart unfolds like an [Accordion](/components/accordion/), shifting the page content.
- When the [Accordion](/components/accordion/) is expanded, clicking on another minitrend replaces the content in it with the selected value.

| State   | Appearance example                            |
| ------- | --------------------------------------------- |
| Default | ![minitrend](static/clickable-minitrend1.png) |
| Hover   | ![minitrend](static/clickable-minitrend2.png) |
| Active  | ![minitrend](static/clickable-minitrend3.png) |

@## Edge cases

| State                                                                                                                                                                               | Appearance example                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Show [Skeleton](/components/skeleton) while the first page load.                                                                                                                    | ![skeleton](static/skeleton.png)           |
| Show [Spin](/components/spin) after reloading the data, applying filters on the page, etc.                                                                                          | ![spin](static/spin.png)                   |
| Show `n/a` message if data is missing.                                                                                                                                              | ![not available](static/not-available.png) |
| If you cannot show metric because of the error, show `Warning` icon with M size and the reload link. While hovering over the icon show tooltip with `Something went wrong` message. | ![error](static/error2.png)                |
| Show `Something went wrong` message for metrics with errors. _The entire widget or individual metrics are covered by a white overlay with 80% transparency._                        | ![error](static/error.png)                 |

@## Adaptivity

Summary widget can have maximum and minimum width at different resolutions.

- The maximum width of the Summary always depends on the content it contains.
- **Do not stretch the metrics widget to the full width of the page.**

@page summary-code
