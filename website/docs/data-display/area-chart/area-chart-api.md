---
title: Area chart
fileSource: d3-chart
tabs: Design('area-chart'), A11y('area-chart-a11y'), API('area-chart-api'), Examples('area-chart-d3-code'), Changelog('d3-chart-changelog')
---

## D3 API

## Chart. Area

```js
import {
    Chart
} from 'intergalactic/d3-chart';
```

<TypesView type="AreaChartProps" :types={...types} />

## Area

It have children components `Dots, Null` .

```js
import {
    Area
} from 'intergalactic/d3-chart';

<
Area >
    <
    Area.Dots / >
    <
    Area.Null / >
    <
    /Area>;
```

<TypesView type="AreaProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts'; </script>
