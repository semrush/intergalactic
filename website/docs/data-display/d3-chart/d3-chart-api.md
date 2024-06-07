---
title: D3 chart
fileSource: d3-chart
tabs: Design('d3-chart'), Concept and code('d3-chart-code'), API('d3-chart-api'), A11y('d3-chart-a11y'), Changelog('d3-chart-changelog')
---

## Plot

Root element for all charts.

```js
import { Plot } from 'intergalactic/d3-chart';
```

<TypesView type="PlotProps" :types={...types} />

## Axis

It have children components `Title, Ticks, Grid`.

```js
import { XAxis, YAxis } from 'intergalactic/d3-chart';

<XAxis>
  <XAxis.Title />
  <XAxis.Ticks />
  <XAxis.Grid />
</XAxis>;
```

<TypesView type="XAxisProps" :types={...types} />

<TypesView type="YAxisProps" :types={...types} />

<TypesView type="AxisTitleProps" :types={...types} />

<TypesView type="AxisTicksProps" :types={...types} />

<TypesView type="AxisGridProps" :types={...types} />

## ResponsiveContainer

Container watch to size block.

```js
import { ResponsiveContainer } from 'intergalactic/d3-chart';
```

<TypesView type="ResponsiveContainerProps" :types={...types} />

## HoverLine

Component for show line after hover on chart.

```js
import { HoverLine } from 'intergalactic/d3-chart';
```

<TypesView type="HoverProps" :types={...types} />

## HoverRect

Component for show sector after hover on chart.

```js
import { HoverRect } from 'intergalactic/d3-chart';
```

<TypesView type="HoverProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>

## Pattern fill

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

## ReferenceLine

```js
import { ReferenceLine } from 'intergalactic/d3-chart';
```

<TypesView type="ReferenceLineProps" :types={...types} />

<TypesView type="ReferenceLineTitleProps" :types={...types} />

<TypesView type="ReferenceBackgroundProps" :types={...types} />

<TypesView type="ReferenceStripesProps" :types={...types} />