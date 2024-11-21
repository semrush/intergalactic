---
title: Radar chart
fileSource: d3-chart
tabs: Design('radar-chart'), API('radar-chart-api'), Examples('radar-chart-code')
---

## D3 chart

For all common D3 chart properties, refer to [D3 chart API](/data-display/d3-chart/d3-chart-api).

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar/>;
```

<TypesView type="RadarProps" :types={...types} />

## Radar.Axis

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar.Axis/>;
```

<TypesView type="RadarAxisProps" :types={...types} />

## Radar.Axis.Labels

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar.Axis.Labels/>;
```

<TypesView type="RadarAxisLabelsProps" :types={...types} />

## Radar.Axis.Ticks

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar.Axis.Ticks/>;
```

<TypesView type="RadarAxisTicksProps" :types={...types} />

## Radar.Polygon

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar.Polygon/>;
```

<TypesView type="RadialPolygonProps" :types={...types} />

## Radar.Polygon.Line

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar.Polygon.Line/>;
```

<TypesView type="RadialPolygonLineProps" :types={...types} />

## Radar.Polygon.Dots

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar.Polygon.Dots/>;
```

<TypesView type="RadialPolygonDotsProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
