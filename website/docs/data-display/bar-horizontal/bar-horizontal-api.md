---
title: Horizontal bar chart
fileSource: d3-chart
tabs: Design('bar-horizontal'), A11y('bar-horizontal-a11y'), API('bar-horizontal-api'), Examples('bar-horizontal-d3-code'), Changelog('d3-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## Chart.Bar

For Horizontal view, you should pass `true` into `invertAxis` prop

```js
import { Chart } from '@semcore/ui/d3-chart';
```

<TypesView type="BarChartProps" :types={...types} />

## HorizontalBar

Horizontal chart Bar.

```js
import { HorizontalBar } from '@semcore/ui/d3-chart';
```

<TypesView type="HorizontalBarProps" :types={...types} />

## GroupBar

It have children components `Bar, HorizontalBar`.

```js
import { GroupBar } from '@semcore/ui/d3-chart';

<GroupBar>
  <GroupBar.Bar />
  <GroupBar.HorizontalBar />
</GroupBar>;
```

<TypesView type="GroupBarProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
