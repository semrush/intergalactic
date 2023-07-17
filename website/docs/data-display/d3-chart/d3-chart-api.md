---
title: API
fileSource: d3-chart
---

@## Plot

Root element for all charts.

```js
import { Plot } from '@semcore/ui/d3-chart';
```

@typescript IPlotProps

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

@typescript IXAxisProps

@typescript IYAxisProps

@typescript IAxisTitleProps

@typescript IAxisTicksProps

@typescript IAxisGridProps

@## ResponsiveContainer

Container watch to size block.

```js
import { ResponsiveContainer } from '@semcore/ui/d3-chart';
```

@typescript IResponsiveContainerProps

@## HoverLine

Component for show line after hover on chart.

```js
import { HoverLine } from '@semcore/ui/d3-chart';
```

@typescript IHoverProps

@## HoverRect

Component for show sector after hover on chart.

```js
import { HoverRect } from '@semcore/ui/d3-chart';
```

@typescript IHoverProps
