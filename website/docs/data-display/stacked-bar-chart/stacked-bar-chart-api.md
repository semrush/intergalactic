---
title: API
fileSource: d3-chart
---

@## D3 API

@## Chart.Bar

For stacked view, you should pass `stack` into `type` prop

```js
import { Chart } from '@semcore/ui/d3-chart';
```

@typescript BarChartProps

@## StackBar

It have children components `Bar, HorizontalBar`.

```js
import { StackBar } from '@semcore/ui/d3-chart';

<StackBar>
  <StackBar.Bar />
  <StackBar.HorizontalBar />
</StackBar>;
```

@typescript StackBarProps
