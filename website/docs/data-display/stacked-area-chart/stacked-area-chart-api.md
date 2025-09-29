---
title: Stacked area chart
fileSource: d3-chart
tabs: Design('stacked-area-chart'), A11y('stacked-area-chart-a11y'), API('stacked-area-chart-api'), Examples('stacked-area-chart-code'), Changelog('stacked-area-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Area

For stacked view, you should pass `true` into `stacked` prop

```js
import { Chart } from '@semcore/d3-chart';
```

<TypesView type="AreaChartProps" :types={...types} />

## StackedArea

It have children components `Area`.

```js
import { StackedArea } from '@semcore/d3-chart';

<StackedArea>
  <StackedArea.Area />
</StackedArea>;
```

<TypesView type="StackedAreaProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
