---
title: API
fileSource: d3-chart
tabs: Line chart('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

It have children components `Dots, Null`.

```js
import { Line } from '@semcore/ui/d3-chart';

<Line>
  <Line.Dots />
  <Line.Null />
</Line>;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="LineProps" :types={...types} />
