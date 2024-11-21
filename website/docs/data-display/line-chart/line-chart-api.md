---
title: Line chart
fileSource: d3-chart
tabs: Design('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Line

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="LineChartProps" :types={...types} />

## Line

It have children components `Dots, Null`.

```js
import { Line } from '@semcore/ui/d3-chart';

<Line>
  <Line.Dots />
  <Line.Null />
</Line>;
```

<TypesView type="LineProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
