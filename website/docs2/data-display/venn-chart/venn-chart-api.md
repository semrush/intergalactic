---
title: API
fileSource: d3-chart
tabs: Venn chart('venn-chart'), A11y('venn-chart-a11y'), API('venn-chart-api'), Examples('venn-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

It have children components `Circle`, `Intersection`.

```js
import { Venn } from '@semcore/ui/d3-chart';

<Venn>
  <Venn.Circle />
  <Venn.Intersection />
</Venn>;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="VennProps" :types={...types} />
