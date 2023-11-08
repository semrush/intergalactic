---
title: Line chart
fileSource: d3-chart
tabs: Design('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
Basic data visualization rules in widgets with charts are described in [Data visualization](/data-display/d3-chart/d3-chart).
:::

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, LineChartProps } from '@semcore/d3-chart';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const area = {
  Line1: data.map((item) => {
    return {
      x: item.x,
      y0: item.Line1 - 1,
      y1: item.Line1 + 1,
    };
  }),
  Line2: data.map((item) => {
    return {
      x: item.x,
      y0: item.Line2 - 1,
      y1: item.Line2 + 1,
    };
  }),
  Line3: data.map((item) => {
    return {
      x: item.x,
      y0: item.Line3 - 1,
      y1: item.Line3 + 1,
    };
  }),
};

const curveMap = {
  curveCardinal,
  curveLinearClosed,
  curveBumpX,
};

const App = PlaygroundGeneration((preview) => {
  const { select, radio, label, bool } = preview('Chart.Line');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
    showTotalInTooltip,
  } = chartPlayground({ select, radio, label, bool });

  label({ label: 'Linear chart props', key: 'linearChartProps' });

  const curveName = select({
    key: 'curveName',
    defaultValue: 'No curve',
    label: 'Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const hideDots = bool({
    key: 'hideDots',
    defaultValue: false,
    label: 'hide dots',
  });

  const withArea = bool({
    key: 'withArea',
    defaultValue: false,
    label: 'Enable area',
  });

  const areaCurve = select({
    key: 'areaCurve',
    defaultValue: 'No curve',
    label: 'Area Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const chartProps: LineChartProps = {
    data,
    groupKey: 'x',
    plotWidth: 300,
    plotHeight: 200,
    showTotalInTooltip,
    direction,
    hideTooltip,
    hideDots,
    curve: curveMap[curveName],
    hideXAxis,
    hideYAxis,
    alignItems,
    justifyContent,
    area: withArea ? area : undefined,
    areaCurve: curveMap[areaCurve],
  };

  if (hideLegend) {
    chartProps.hideLegend = true;
  } else {
    chartProps.legendProps = legendProps;
  }

  return <Chart.Line {...chartProps} />;
});
</script>

:::

## Description

**Line chart** helps to visualize the trend of numeric variables over a period of time.

If you have an array of values for a certain period, you can use this chart type to present changes of the array through the time.

**Important points to keep in mind when presenting data as a line chart:**

- The axes should be clear to the user from the chart name. However, in cases where the chart name isn’t enough, you can add labels for the axes.
- Remove all unnecessary visual information, such as extra additional background lines and a bunch of colors. Otherwise, this may distract the user from being able to understand the data.
- If the data doesn't start from zero, in some cases you can zoom the chart to the `Y-axis`. This can make your data more readable and easier to understand.
- **Try not to compare more than 5-7 categories on a line chart**. The chart may become unreadable and confusing.

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

| Example                                       | Styles                 |
| --------------------------------------------- | ---------------------- |
| ![](static/without-dots.png) | Line thickness is 3px. |

We recommended you to display the dots on lines either when there are few of them (one or two), or when data collection is irregular.

| Example                            | Styles                                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![](static/dots.png) | Point size is 8px * 8px, `border: 2px solid var(--chart-grid-border)`. When hovering, the dot increases to 12px * 12px. |

## Interaction

When user hovers over the chart area, show a vertical guide line at the nearest dot and a tooltip with detailed data for the dot appears next to it. The color of the vertical guide line is `--chart-grid-y-accent-hover-line`.

![](static/popover-1.png)

When user hovers over the chart area without values, show tooltip with information. In this case, the value is `n/a`.

![](static/partially.png)

If there are a lot of categories on the chart, the tooltip shows dots and values for all dots under the cursor.

::: tip
Don’t change the order of categories inside the tooltip in relation to the order of lines on the chart.
:::

![](static/popover-2.png)

::: tip
To see detailed information about tooltip for charts see [Chart principles](/data-display/d3-chart/d3-chart#tooltip).
:::

## Edge cases

Here you will find the states for some specific cases. All other "empty states" for widgets are specified in [Error & n/a widget states](/components/widget-empty/widget-empty).

## One value

For this case enable the display of dots on the chart by default.

![](static/one-dot-line-chart.png)

### Styles

- **Point size is 8px \* 8px**. When hovering, the point increases to **12px \* 12px**.
- The line has the `dashed` border style and `--chart-grid-y-accent-hover-line` color.

## Two values

For this case enable the display of dots on the chart by default.

**Example 1** is for the case when there is data for two non-near dates.

![](static/two-dots1-line-chart.png)

**Example 2** is when there is data for one after another dates.

![](static/two-dots2.png)

## Null values

If all values on the chart are zero, then show the trend line on the zero axis.

::: tip
**Zero is also data. 0 ≠ `n/a`.**
:::

![](static/null-line-chart.png)

## No data

When user hovers over a dot that some of the categories don't have data for, show tooltip with the `n/a` value for these categories.

![](static/not-available.png)

## No data area

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

![](static/line-skeleton.png)

