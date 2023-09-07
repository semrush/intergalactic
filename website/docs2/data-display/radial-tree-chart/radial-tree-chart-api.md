---
title: API
fileSource: d3-chart
tabs: Radial Tree chart('radial-tree-chart'), API('radial-tree-chart-api'), A11y('radial-tree-chart-a11y'), Examples('radial-tree-chart-d3-examples'), Changelog('d3-chart-changelog')
---

## D3 API

It have children component `Title`.

```js
import { RadialTree } from '@semcore/ui/d3-chart';

<RadialTree>
  <RadialTree.Radian>
    <RadialTree.Radian.Label />
    <RadialTree.Radian.Line />
    <RadialTree.Radian.Cap />
    <RadialTree.Radian.Icon />
  </RadialTree.Radian>
  <RadialTree.Title></RadialTree.Title>
</RadialTree>;
```

<TypesView type="RadialTreeProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>