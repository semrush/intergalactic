---
title: Histogram
fileSource: d3-chart
tabs: Design('histogram-chart'), A11y('histogram-chart-a11y'), API('histogram-chart-api'), Changelog('histogram-chart-changelog')
---

Histogram is based on [Bar chart](/data-display/bar-chart/bar-chart), but has slightly different settings.

::: tip
Note that Histogram and [Bar chart](/data-display/bar-chart/bar-chart) are used in different cases. Refer to [Histogram vs. Bar chart](./histogram-chart#histogram-vs-bar-chart) for more information.
:::

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Histogram

For Horizontal view, use `invertAxis={true}`.

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="HistogramChartProps" :types={...types} />

## Bar

Properties of a single Histogram bar are the same as in [Bar chart](/data-display/bar-chart/bar-chart-api#bar).

<script setup>import { data as types } from '@types.data.ts';</script>
