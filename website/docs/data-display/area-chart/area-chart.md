---
title: Area chart
fileSource: d3-chart
tabs: Design('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
Basic data visualization rules are described in the [D3 chart principles](/data-display/d3-chart/d3-chart).
:::

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, AreaChartProps } from '@semcore/d3-chart';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const curveMap = {
  curveCardinal,
  curveLinearClosed,
  curveBumpX,
};

const App = PlaygroundGeneration((preview) => {
  const { select, radio, label, bool } = preview('Chart.Area');

  const {
    direction,
    alignItems,
    justifyContent,
    showXAxis,
    showYAxis,
    showTotalInTooltip,
    showTooltip,
    showLegend,
    legendProps,
    patterns,
  } = chartPlayground({ select, radio, label, bool });

  label({ label: 'Linear chart props', key: 'linearChartProps' });

  const curveName = select({
    key: 'curveName',
    defaultValue: 'No curve',
    label: 'Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const showDots = bool({
    key: 'showDots',
    defaultValue: true,
    label: 'Show dots',
  });

  const stacked = bool({
    key: 'stacked',
    defaultValue: false,
    label: 'Is stacked',
  });

  const chartProps: AreaChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 300,
    plotHeight: 200,
    showTotalInTooltip,
    direction,
    showTooltip,
    showDots,
    curve: curveMap[curveName],
    showXAxis,
    showYAxis,
    alignItems,
    justifyContent,
    stacked,
    patterns,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Area {...chartProps} />;
}, {filterProps: ['data']});

</script>

:::


## Description

**Area chart** visualizes a trend and the ratio of numeric variables over a period of time. It can be used instead of [Line chart](/data-display/line-chart/line-chart) when it is important to demonstrate the ratio of parts to the whole.

**Important points to keep in mind when presenting data as an area chart:**

- A chart with areas shall be used when you need to show a larger picture of the data. _For example, line charts can be used to show the change in a population over time, while charts with areas are excellent for demonstrating the total volume of population over a time period._
- Try not to use too many categories (**it isn’t recommended to use more than 4 categories**). In such cases, it is better to use a line chart as it provides a cleaner and clearer data reading.
- Don't forget to clearly name the chart so that the axes are understandable enough.
- Use [Stacked area chart](/data-display/stacked-area-chart/stacked-area-chart) when, in addition to data amount, you need to display the part to the whole data.

::: tip
Useful materials about line chart vs. area chart:

- [Choosing the right chart type: Line charts vs Area charts](https://www.fusioncharts.com/blog/line-charts-vs-area-charts/)
- [The Fine Line In a Gray Area: When to Use Line vs Area Charts](https://visual.ly/blog/line-vs-area-charts/)
:::

## Appearance

By default, we show a chart with straight lines. This view facilitates reading the exact values on the trend. This is what most people look at the chart for.

::: tip
Add a possibility to select either straight or smooth line type in the widget settings.
:::

| Example                                             | Styles                                                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![Area chart without dots.](static/without-dots.png) | **Line thickness is 3px**. Background color under the line is the color of the line with 0.2 transparency. |

We recommend you to display the dots on lines either when there are few of them (one or two), or when data collection is irregular.

| Example                                  | Styles                                                                                                                      |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![Area chart with dots.](static/dots.png) | Dot size is `8px * 8px`, `border: 2px solid var(--chart-grid-border)`. When hovering, the point increases to `12px * 12px`. |

## Interaction

When user hovers over the chart area, show a vertical guide line at the nearest dot and a tooltip with detailed data for the dot appears next to it. The color of the vertical guide line is `--chart-grid-y-accent-hover-line`.

::: tip
To see detailed information about tooltip for charts see [Chart principles](/data-display/d3-chart/d3-chart#tooltip) or [Line chart](/data-display/line-chart/line-chart).
:::

## Edge cases

Here you will find the states for some specific cases. All other "empty states" for widgets are specified in [Error & n/a widget states](/components/widget-empty/widget-empty).

## One value

For this case enable the display of dots on the chart by default.

![](static/one-dot-area-chart.png)

### Styles

- **Dot size is 8px \* 8px**. When hovering, the point increases to **12px \* 12px**.
- The line has the `dashed` border style and `--chart-palette-order-other-data` color.

## Two values

For this case enable the display of dots on the chart by default.

**Example 1** is for the case when there is data for two non-near dates.

![](static/two-dots1-area-chart.png)

**Example 2** is when there is data for one after another dates.

![](static/two-dots2.png)

## Null values

If all values on the chart are zero, then show the trend line on the zero axis.

::: tip
**Zero is also data. 0 ≠ `n/a`.**
:::

![](static/null-area-chart.png)

## No data

::: tip
**When there is no data, you can't draw a zero line. Zero is also data. 0 ≠ `n/a`.**
:::

In the area without data, show a dashed line between known dots. If the not available period is at the beginning or end of the chart, then the lines must be horizontal.

![](static/partially-trash.png)

When user hovers over a dot without data, show the tooltip with the `n/a` value. We recommend you to add a message why there is no data, and when it will be available, if possible.

![](static/partially.png)

## Initial data loading

When the chart is loading for the first time, show [Skeleton](/components/skeleton/skeleton) instead of the chart.

If the chart has a title, show it during loading. The user will have an idea of what is being loaded and whether they need to wait for the loading process to complete.

For more information about this state, refer to [Skeleton](/components/skeleton/skeleton).

Use the `--skeleton-bg` color token for the skeleton background color.

Use the `--skeleton-bg` color token for the skeleton background color.

Use the `--skeleton-bg` color token for the skeleton background color.

Use the `--skeleton-bg` color token for the skeleton background color.

![](static/area-skeleton.png)

