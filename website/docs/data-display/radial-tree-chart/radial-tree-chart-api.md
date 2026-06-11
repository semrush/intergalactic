---
title: Radial Tree chart
fileSource: d3-chart
tabs: Design('radial-tree-chart'), A11y('radial-tree-chart-a11y'), API('radial-tree-chart-api'), Examples('radial-tree-chart-code'), Changelog('radial-tree-chart-changelog')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

## RadialTree

This chart has children `Title` component.

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
