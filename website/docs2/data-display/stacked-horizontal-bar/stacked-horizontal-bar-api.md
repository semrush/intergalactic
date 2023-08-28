---
title: API
fileSource: d3-chart
tabs: Stacked horizontal bar chart('stacked-horizontal-bar'), A11y('stacked-horizontal-bar-a11y'), API('stacked-horizontal-bar-api'), Examples('stacked-horizontal-bar-d3-code'), Changelog('d3-chart-changelog')
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

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="StackBarProps" :types={...types} />
