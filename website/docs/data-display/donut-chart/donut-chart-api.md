---
title: Donut / Pie chart
fileSource: d3-chart
tabs: Design('donut-chart'), A11y('donut-chart-a11y'), API('donut-chart-api'), Examples('donut-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Donut

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="DonutChartProps" :types={...types} />

## Donut

It have children components `Pie`, `Label`, `EmptyData`.

```js
import { Donut } from '@semcore/ui/d3-chart';

<Donut>
  <Donut.EmptyData />
  <Donut.Pie />
  <Donut.Label />
</Donut>;
```

<TypesView type="DonutProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
