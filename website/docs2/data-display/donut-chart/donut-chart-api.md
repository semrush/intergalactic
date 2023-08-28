---
title: API
fileSource: d3-chart
tabs: Donut / Pie chart('donut-chart'), A11y('donut-chart-a11y'), API('donut-chart-api'), Examples('donut-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

It have children components `Pie`, `Label`, `EmptyData`.

```js
import { Donut } from '@semcore/ui/d3-chart';

<Donut>
  <Donut.EmptyData />
  <Donut.Pie />
  <Donut.Label />
</Donut>;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="DonutProps" :types={...types} />
