---
title: Stacked bar chart
fileSource: d3-chart
tabs: Design('stacked-bar-chart'), A11y('stacked-bar-chart-a11y'), API('stacked-bar-chart-api'), Examples('stacked-bar-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

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