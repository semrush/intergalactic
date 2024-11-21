---
title: Area chart
fileSource: d3-chart
tabs: Design('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Area

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="AreaChartProps" :types={...types} />

## Area

It have children components `Dots, Null`.

```js
import { Area } from '@semcore/ui/d3-chart';

<Area>
  <Area.Dots />
  <Area.Null />
</Area>;
```

<TypesView type="AreaProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
