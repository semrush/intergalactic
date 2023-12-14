---
title: API
fileSource: d3-chart
---

@## D3 API

@## Chart.Bar

For Horizontal view, you should pass `true` into `invertAxis` prop

```js
import { Chart } from '@semcore/ui/d3-chart';
```

@typescript BarChartProps

@## HorizontalBar

Horizontal chart Bar.

```js
import { HorizontalBar } from '@semcore/ui/d3-chart';
```

@typescript HorizontalBarProps

@## GroupBar

It have children components `Bar, HorizontalBar`.

```js
import { GroupBar } from '@semcore/ui/d3-chart';

<GroupBar>
  <GroupBar.Bar />
  <GroupBar.HorizontalBar />
</GroupBar>;
```

@typescript GroupBarProps
