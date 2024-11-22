---
title: Histogram chart
fileSource: d3-chart
tabs: Design('histogram-chart'), A11y('histogram-chart-a11y'), API('histogram-chart-api'), Changelog('d3-chart-changelog')
---

Histogram chart is based on the [bar chart](/data-display/bar-chart/bar-chart), but has slightly different settings.

::: tip
Please note that histogram chart and [bar chart](/data-display/bar-chart/bar-chart) are used in the various cases. Check out the guides for more information.
:::

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Histogram

For Horizontal view, you should pass `true` into `invertAxis` prop

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="HistogramChartProps" :types={...types} />

## Bar

All properties for the histogram chart developed with D3 you can find in the [bar chart guide](/data-display/bar-chart/bar-chart-api).

<script setup>import { data as types } from '@types.data.ts';</script>
