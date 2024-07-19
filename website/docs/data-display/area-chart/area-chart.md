---
title: Area chart
fileSource: d3-chart
tabs: Design('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

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

::: info
Basic data visualization rules are described in the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Area chart** shows trends and the relationship between numeric variables over time. Area charts often used to show overall trends over time rather than specific values.

**Key considerations for using area chart:**

- Use an area chart to present a broader view of data. _For example, line charts are good for tracking population changes over time, but area charts excel at showing the total population volume over a period._
- Stick to no more than four data sets to keep your chart readable. If you have more, the [Line](/data-display/line-chart/line-chart) might be a better choice for a clearer view.
- Ensure the chart is clearly labeled for easy understanding of the axes.
- For showing data proportions as well as quantities, use a [Stacked area chart](/data-display/stacked-area-chart/stacked-area-chart).

::: tip
Refer to materials below, to have insights on choosing between line and area charts:

- [Choosing the right chart type: Line charts vs Area charts](https://www.fusioncharts.com/blog/line-charts-vs-area-charts/)
- [The Fine Line In a Gray Area: When to Use Line vs Area Charts](https://visual.ly/blog/line-vs-area-charts/)
:::

## Appearance

Charts are displayed with non-curved lines by default (without `curve` property) to make it easier to read exact values.

| Example                                             | Styles                                                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![Area chart without dots.](static/without-dots.png) | **Line thickness: 3px.** The background color under the line matches the line color with 0.2 transparency. |

Display dots on lines when data points either are few or collected irregularly.

| Example                                  | Styles                                                                                                                      |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![Area chart with dots.](static/dots.png) | Dot has size **8px * 8px** and **border: 1px solid var(--chart-grid-border)**. On hover, dot expand to **10px * 10px**. |

## Interaction

Hovering over the chart highlights the nearest point with a vertical guide line, enlarges the dot, and shows a detailed tooltip. The color of the vertical guide line is `--chart-grid-y-accent-hover-line`.

::: tip
For detailed tooltip information, see [Chart principles](/data-display/d3-chart/d3-chart#tooltip) and [Line chart](/data-display/line-chart/line-chart).
:::

## Edge cases

### One value

Display dots by default for charts with a single data point. The line is dashed and colored with `--chart-palette-order-other-data`.

![](static/one-dot-area-chart.png)

### Two values

Display dots by default.

**Example 1** is for two distant dates.

![](static/two-dots1-area-chart.png)

**Example 2** is for consecutive dates.

![](static/two-dots2.png)

### Null values

Display the line at the zero axis if all values are zero.

::: tip
Zero counts as data. 0 ≠ n/a.
:::

![](static/null-area-chart.png)

### No data

For periods without data, use a dashed line between known points.

::: tip
When there is no data, you can't draw a zero line. Zero counts as data. 0 ≠ n/a.
:::

![](static/partially-trash.png)

Display a tooltip with n/a when hovering over a dot without data, and explain why, if possible.

![](static/partially.png)

## Initial data loading

Show [Skeleton](/components/skeleton/skeleton) during initial loading. If the chart has a title, display it to inform users about what's loading. Refer to [Skeleton](/components/skeleton/skeleton) for more details.

Use the `--skeleton-bg` color token for the skeleton's background.

![](static/area-skeleton.png)

Refer to [Error & n/a widget states](/components/widget-empty/widget-empty) for all other empty states.
