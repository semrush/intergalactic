---
title: API
fileSource: d3-chart
---

@## Plot

Root element for all charts.

```js
import { Plot } from '@semcore/ui/d3-chart';
```

@typescript PlotProps

@## Axis

It have children components `Title, Ticks, Grid`.

```js
import { XAxis, YAxis } from '@semcore/ui/d3-chart';

<XAxis>
  <XAxis.Title />
  <XAxis.Ticks />
  <XAxis.Grid />
</XAxis>;
```

@typescript XAxisProps

@typescript YAxisProps

@typescript AxisTitleProps

@typescript AxisTicksProps

@typescript AxisGridProps

@## ResponsiveContainer

Container watch to size block.

```js
import { ResponsiveContainer } from '@semcore/ui/d3-chart';
```

@typescript ResponsiveContainerProps

@## HoverLine

Component for show line after hover on chart.

```js
import { HoverLine } from '@semcore/ui/d3-chart';
```

@typescript HoverProps

@## HoverRect

Component for show sector after hover on chart.

```js
import { HoverRect } from '@semcore/ui/d3-chart';
```

@typescript HoverProps
