---
title: Mini chart
tabs: Design('mini-chart'), A11y('mini-chart-a11y'), API('mini-chart-api'), Example('mini-chart-code'), Changelog('mini-chart-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import MiniChart from '@semcore/mini-chart';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const App = PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, select, text, onChange } = createGroupWidgets('MiniChart');

    const type = select({
      key: 'type',
      defaultValue: 'scoreLine',
      label: 'Type',
      options: [
        {name: 'scoreLine', value: 'scoreLine'},
        {name: 'scoreSegmentLine', value: 'scoreSegmentLine'},
        {name: 'scoreDonut', value: 'scoreDonut'},
        {name: 'scoreSemiDonut', value: 'scoreSemiDonut'},
        {name: 'trendArea', value: 'trendArea'},
        {name: 'trendLine', value: 'trendLine'},
      ],
    });

    const value = 30;

    if (type === 'scoreLine') {
      return (
        <MiniChart.ScoreLine
          value={value}
          w={'100px'}
        />
      );
    }

if (type === 'scoreSegmentLine') {
      return (
        <MiniChart.ScoreLine
          segments={5}
          value={3}
          w={'100px'}
        />
      );
    }

if (type === 'scoreDonut') {
      return (
        <MiniChart.ScoreDonut
          value={value}
          w={'40px'}
        />
      );
    }

if (type === 'scoreSemiDonut') {
      return (
        <MiniChart.ScoreSemiDonut
          value={value}
          w={'40px'}
        />
      );
    }

if (type === 'trendArea') {
      return (
        <MiniChart.TrendArea
          w={'220px'}
          h={'50px'}
          data={[20, 50, 80, 65, 33, 12, 15, 18]}
        />
      );
    }

if (type === 'trendLine') {
      return (
        <MiniChart.TrendLine
          data={[20, 50, 33, 80, 70, 35, 10, 40, 90, 50]}
          w={'140px'}
          h={'40px'}
        />
      );
    }

    return null;
  },
  {
    filterProps: ['w', 'h', 'value', 'data'],
  },
);
</script>

:::

## Description

**Mini chart** is a component for visualizing a small data set or a single value that needs to be highlighted in the interface to assist the user in quickly reviewing data and understanding how the data has changed on the page.

## Types

Mini chart has two types:

Table: Mini chart types

| type    | Appearance example    | Description                                                                                                                           |
| ------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `trend` | ![](static/trend.png) | Use to show trend from a list of values.                                                                                              |
| `score` | ![](static/score.png) | Use to visualize some value or to indicate if something (in per cents or absolute numbers) is good/bad, high/low, above average, etc. |

### Trend type

Table: Versions of charts with trend type

| Chart type      | Appearance example              | Description                                                                                                            |
| --------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Line chart      | ![](static/trend-line.png)      | Use to show overall trend over time for a big data set.                                                                |
| Area chart      | ![](static/trend-area.png)      | Use to show overall trend over time for a big data set, but when you need to make trend more visible in the interface. |
| Bar chart       | ![](static/trend-bar.png)       | Use to show overall trend over time for a small data set.                                                              |
| Histogram chart | ![](static/trend-histogram.png) | Use to show overall trend over time for a big data set.                                                                |

You can show the highest/lowest point if necessary.

![](static/trend-point.png)

![](static/trend-bar-point.png)

### Score type

The choice of one of the charts below depends on how visually prominent the value should be in your interface and how much space is actually available.

Table: Versions of charts with score type

| Chart type               | Appearance example               |
| ------------------------ | -------------------------------- |
| Donut chart              | ![](static/score-donut.png)      |
| Semi donut chart (Gauge) | ![](static/score-semi-donut.png) |
| Line gauge chart         | ![](static/score-line-gauge.png) |

## Sizes

The component charts have default sizes, but you can set them to those you need, chart will scale to them. For example:

![](static/trend-bar-size-big.png)

## Usage with text

You can place a value with any font size next to a mini-chart. We recommend making margins multiples of our `--intergalactic-scale-indent` (4px).

![](static/text-1.png)

![](static/text-2.png)

![](static/text-3.png)

## States

Table: Mini chart states

| State                | Appearance example              | Description                                                                                                        |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Default              | ![](static/trend-default.png)   |                                                                                                                    |
| Null data            | ![](static/trend-null-data.png) | If all values on the chart are zero, then show the trend line on the zero axis. **Zero counts as data. 0 ≠ n/a.**  |
| No available data    | ![](static/trend-no-data.png)   | If there are no available data, then show only the "n/a" text for the value.                                       |
| Initial data loading | ![](static/trend-skeleton.png)  | When the chart is loading for the first time, show [Skeleton](/components/skeleton/skeleton) instead of the chart. |
