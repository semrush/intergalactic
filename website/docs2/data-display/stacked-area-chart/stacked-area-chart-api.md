---
title: API
fileSource: d3-chart
tabs: Stacked area chart('stacked-area-chart'), A11y('stacked-area-chart-a11y'), API('stacked-area-chart-api'), Examples('stacked-area-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

It have children components `Area`.

```js
import { StackedArea } from '@semcore/ui/d3-chart';

<StackedArea>
  <StackedArea.Area />
</StackedArea>;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="StackedAreaProps" :types={...types} />
