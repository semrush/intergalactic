---
title: API
fileSource: d3-chart
tabs: Area chart('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

It have children components `Dots, Null`.

```js
import { Area } from '@semcore/ui/d3-chart';

<Area>
  <Area.Dots />
  <Area.Null />
</Area>;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="AreaProps" :types={...types} />
