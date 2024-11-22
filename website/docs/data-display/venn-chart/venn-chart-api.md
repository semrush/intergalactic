---
title: Venn chart
fileSource: d3-chart
tabs: Design('venn-chart'), A11y('venn-chart-a11y'), API('venn-chart-api'), Examples('venn-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Venn

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="VennChartProps" :types={...types} />

## Venn

It have children components `Circle`, `Intersection`.

```js
import { Venn } from '@semcore/ui/d3-chart';

<Venn>
  <Venn.Circle />
  <Venn.Intersection />
</Venn>;
```

<TypesView type="VennProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
