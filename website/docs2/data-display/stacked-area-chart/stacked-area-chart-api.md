---
title: Stacked area chart
fileSource: d3-chart
tabs: Design('stacked-area-chart'), A11y('stacked-area-chart-a11y'), API('stacked-area-chart-api'), Examples('stacked-area-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

It have children components `Area`.

```js
import { StackedArea } from '@semcore/ui/d3-chart';

<StackedArea>
  <StackedArea.Area />
</StackedArea>;
```

<TypesView type="StackedAreaProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>