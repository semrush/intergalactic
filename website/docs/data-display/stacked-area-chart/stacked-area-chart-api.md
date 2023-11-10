---
title: API
fileSource: d3-chart
---

@## D3 API


@## Chart.Area

For stacked view, you should pass `true` into `stacked` prop

```js
import { Chart } from '@semcore/ui/d3-chart';
```

@typescript AreaChartProps

@## StackedArea

It have children components `Area`.

```js
import { StackedArea } from '@semcore/ui/d3-chart';

<StackedArea>
  <StackedArea.Area />
</StackedArea>;
```

@typescript StackedAreaProps
