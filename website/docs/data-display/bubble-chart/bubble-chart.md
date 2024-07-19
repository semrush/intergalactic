---
title: Bubble chart
fileSource: d3-chart
tabs: Design('bubble-chart'), A11y('bubble-chart-a11y'), API('bubble-chart-api'), Examples('bubble-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { chartPlayground } from '@components/ChartPlayground';
import { Chart, BubbleChartProps } from '@semcore/d3-chart';
import resolveColor from 'intergalactic/utils/lib/color';

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1' },
  { x: 1, y: 9, value: 40, label: 'label 2' },
  { x: 6, y: 2, value: 45634, label: 'label 3' },
  { x: 4, y: 7, value: 245, label: 'label 4' },
  { x: 9, y: 5, value: 7462, label: 'label 5' },
];

const App = PlaygroundGeneration((preview) => {
  const { select, radio, label, bool } = preview('Chart.Line');

  const {
    direction,
    alignItems,
    justifyContent,
    showXAxis,
    showYAxis,
    showTooltip,
    showLegend,
    legendProps,
    patterns,
  } = chartPlayground({ select, radio, label, bool });

  legendProps.shape = 'Checkbox';

  const chartProps: BubbleChartProps = {
    data,
    plotWidth: 300,
    plotHeight: 200,
    direction,
    showTooltip,
    showXAxis,
    showYAxis,
    alignItems,
    justifyContent,
    patterns,
  };

  if (showLegend) {
    chartProps.legendProps = legendProps;
  } else {
    chartProps.showLegend = false;
  }

  return <Chart.Bubble {...chartProps} />;
}, {filterProps: ['data']});

</script>

:::

::: info
Basic data visualization rules are described in the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Bubble chart** shows data relationships using size, color, and position on axes. It's useful for spotting data set patterns and can display up to 3-4 variables. A bubble chart is a mix between a scatterplot chart and a proportional area chart.

**When to use bubble chart:**

- To visualize patterns and relationships in data.
- To show data dimensions using bubble size and color.

::: tip
Bubble charts add dimensions to scatterplots. Not that they can become cluttered with more than 3-4 sets.
:::

## Appearance

Bubble chart plot must has:

- Both vertical and horizontal lines.
- Clear X and Y axis labels.
- A legend for different categories if they vary in color.

::: tip
Make sure to clarify what the bubble size means.
:::

Table: Bubble chart styles

| Case             | Appearance example                                     | Styles                                                                                                                                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One data set      | ![](static/positive-correlation-1.png)      | The default color for the category is `--chart-palette-order-blue` (or `--blue-300`) with 50% transparency. If necessary, you can select any other color from the [chart palette](/data-display/color-palette/color-palette). A bubble always has a 2px white stroke. The center of the bubble is marked with a cross in the same color as the circle itself. |
| Several data sets | ![](static/positive-correlation-2.png) | Use colors from the [chart palette](/data-display/color-palette/color-palette).   |

### Text labels for bubbles

Use captions for bubbles sparingly to avoid clutter, especially on dense charts.

::: tip
Remember to check contrast for the text labels. We don’t recommend to use light colors from the palette for the Bubble chart data. Use colors with 400 shade and higher from the [color palette](/data-display/color-palette/color-palette), they have the minimum necessary contrast with the white background.
:::

![](static/labels.png)

## Legend

- Add a legend for multiple data sets, with clear values for each.
- A vertical legend layout is preferred for easier reading and values comparing.

![](static/positive-correlation-2.png)

## Interaction

- Bubbles increase opacity to 80% on hover, displaying specific values.
- The cursor changes to a `pointer` for clickable bubbles.

![](static/hover-1.png)

## Tooltip

Tooltips should show:

- X-axis and Y-axis values.
- Additional values influencing bubble size.
- Focus tooltips information on values, incorporating colors for multiple data sets.

Table: Bubble chart tooltips

| Case             | Appearance example       |
| ---------------- | ------------------------ |
| One data set      | ![](static/hover-2.png) |
| Several data sets | ![](static/hover-1.png) |

### Bubbles intersection

Only show values for the hovered bubble, not intersections.

![](static/hover-1.png)

## Edge cases

### Outliers 

To prevent small values from being lost under the large ones (outliers), the bubble has a minimum size – 11px by 11px.

![](static/outliers-1.png) ![](static/outliers-2.png)

### Null values

Zero values are displayed at the origin, with legend reflecting zero data.

::: tip
Zero counts as data. 0 ≠ n/a.
:::

![](static/null-1.png) ![](static/null-2.png)

### No data

Omit points without data on the chart and reflect this in the legend.

![](static/n-a-1.png)

![](static/n-a-2.png)

### Bubbles near axes

The chart will scale automatically if the bubble is near the axes.

![](static/cut.png)

## Initial data loading

Show [Skeleton](/components/skeleton/skeleton) during initial loading. If the chart has a title, display it to inform users about what's loading. Refer to [Skeleton](/components/skeleton/skeleton) for more details.

Use the `--skeleton-bg` color token for the skeleton's background.         

![](static/bubble-chart-skeleton.png)

Refer to [Error & n/a widget states](/components/widget-empty/widget-empty) for all other empty states.

## Usage in UX/UI

### Additional information

Accompany the chart with details on what influences bubble size.

![](static/ux-1.png)

### Axes

Label both the X and Y axes. Avoind coloring the axis labels, this can make the data harder to read.

![](static/color-yes-no.png)

### Chart size

Avoid placing bubble charts in small widgets to ensure data is readable and comparable.

![](static/size-yes-no.png)

### Data sets number

Limit the number of datasets to maintain chart readability.

![](static/categories-yes-no.png)

