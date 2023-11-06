---
title: Stacked horizontal bar chart
fileSource: d3-chart
tabs: Design('stacked-horizontal-bar'), A11y('stacked-horizontal-bar-a11y'), API('stacked-horizontal-bar-api'), Examples('stacked-horizontal-bar-d3-code'), Changelog('d3-chart-changelog')
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