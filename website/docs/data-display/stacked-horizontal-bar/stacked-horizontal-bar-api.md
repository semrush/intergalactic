---
title: Stacked horizontal bar chart
fileSource: d3-chart
tabs: Design('stacked-horizontal-bar'), A11y('stacked-horizontal-bar-a11y'), API('stacked-horizontal-bar-api'), Examples('stacked-horizontal-bar-d3-code'), Changelog('d3-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Bar

For Horizontal view, you should pass `true` into `invertAxis` prop, for stack view, you should pass `stack` into `type` prop.

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="BarChartProps" :types={...types} />

## StackBar.HorizontalBar

It have children components `Bar, HorizontalBar`.

```js
import { StackBar } from '@semcore/ui/d3-chart';

<StackBar>
  <StackBar.Bar />
  <StackBar.HorizontalBar />
</StackBar>;
```

<TypesView type="StackBarProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
