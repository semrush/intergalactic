---
title: API
fileSource: d3-chart
tabs: Radar chart('radar-chart'), API('radar-chart-api'), Examples('radar-chart-code')
---

## D3 API

```js
import { Radar } from '@semcore/ui/d3-chart';

<Radar/>;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

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
