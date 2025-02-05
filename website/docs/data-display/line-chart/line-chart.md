---
title: Line chart
fileSource: d3-chart
tabs: Design('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
---

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
    showXAxis,
    showYAxis,
    showTooltip,
    showLegend,
    legendProps,
    showTotalInTooltip,
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
    label: 'Dots',
  });

  const chartProps: LineChartProps = {
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
    patterns,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Line {...chartProps} />;
}, {filterProps: ['data']});
</script>

:::

::: info
Basic data visualization rules are described in the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Line chart** displays the trend of numeric variables over time, making it ideal for showing changes in data across a specified period.

**Key considerations for line chart:**

- Ensure the chart's axes are clear, adding labels if the chart name isn't sufficient.
- Simplify the chart by removing unnecessary visuals like excessive lines or colors to avoid distracting the viewer.
- If data doesn't start at zero, consider zooming in on the Y-axis for better readability.
- Limit data sets to 5-7 categories to prevent the chart from becoming cluttered and confusing.

::: tip
Refer to materials below, to have insights on choosing between line and area charts:

- [Choosing the right chart type: Line charts vs Area charts](https://www.fusioncharts.com/blog/line-charts-vs-area-charts/)
- [The Fine Line In a Gray Area: When to Use Line vs Area Charts](https://visual.ly/blog/line-vs-area-charts/)
:::

## Appearance

Charts are displayed with non-curved lines by default (without `curve` property) to make it easier to read exact values.

Table: Line chart default appearance

| Example                                       | Styles                 |
| --------------------------------------------- | ---------------------- |
| ![](static/without-dots.png) | Line thickness: 3px. |

Display dots on lines when data points either are few or collected irregularly.

Table: Line chart default appearance with dots

| Example                            | Styles                                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![](static/dots.png) | Dot has size **8px * 8px** and **border: 1px solid var(--chart-grid-border)**. On hover, dot expand to **10px * 10px**. |

## Interaction

Hovering over the chart displays a vertical guide line at the nearest dot and a detailed tooltip. The guide line color is `--chart-grid-y-accent-hover-line`.

![](static/popover-1.png)

Show a tooltip with n/a for areas without data values.

![](static/partially.png)

With many categories, tooltips display dots and values for all under the cursor, maintaining the chart's category order.

::: tip
Keep tooltip category order consistent with the chart.
:::

![](static/popover-2.png)

::: tip
For detailed tooltip information, see [Chart principles](/data-display/d3-chart/d3-chart#tooltip).
:::

## Edge cases

### One value

Display dots by default for charts with a single data point. The line is dashed and colored with `--chart-palette-order-other-data`.

![](static/one-dot-line-chart.png)

### Two values

Display dots by default.

**Example 1** is for two distant dates.

![](static/two-dots1-line-chart.png)

**Example 2** is for consecutive dates.

![](static/two-dots2.png)

### Null values

Display the line at the zero axis if all values are zero.

::: tip
Zero counts as data. 0 ≠ n/a.
:::

![](static/null-line-chart.png)

### No data

For periods without data, use a dashed line between known points.

![](static/partially.png)

::: tip
When there is no data, you can't draw a zero line. Zero counts as data. 0 ≠ n/a.
:::

Display a tooltip with n/a when hovering over a dot without data, and explain why, if possible.

![](static/not-available.png)

## Initial data loading

Show [Skeleton](/components/skeleton/skeleton) during initial loading. If the chart has a title, display it to inform users about what's loading. Refer to [Skeleton](/components/skeleton/skeleton) for more details.

Use the `--skeleton-bg` color token for the skeleton's background.

![](static/line-skeleton.png)

Refer to [Error & n/a widget states](/components/widget-empty/widget-empty) for all other empty states.
