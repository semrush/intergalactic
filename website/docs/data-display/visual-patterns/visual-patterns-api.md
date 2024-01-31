---
title: Visual patterns
fileSource: d3-chart
tabs: Visual patterns('visual-patterns'), API('visual-patterns-api'), Examples('visual-patterns-code')
---

## Patterns api

## Pattern

```js
import { Pattern } from '@semcore/ui/d3-chart';
```

```ts
type Pattern = {
  fill: {
    viewBox: string;
    children: React.ReactNode;
  };
  symbol: {
    viewBox: string;
    size: [width: number, height: number];
    children: React.ReactNode;
  };
};
```

<TypesView type="Pattern" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
