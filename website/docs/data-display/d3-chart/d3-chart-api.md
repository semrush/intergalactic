---
title: API
fileSource: d3-chart
---

@## Plot

Root element for all charts.

```js
import { Plot } from '@semcore/d3-chart';
```

@typescript IPlotProps

@## Axis

It have children components `Ticks, Grid`.

```js
import { XAxis, YAxis } from '@semcore/d3-chart';

<XAxis>
  <XAxis.Ticks />
  <XAxis.Grid />
</XAxis>;
```

@typescript IXAxisProps

@typescript IYAxisProps

@## ResponsiveContainer

Container watch to size block.

```js
import { ResponsiveContainer } from '@semcore/d3-chart';
```

@typescript IResponsiveContainerProps

@## Tooltip

It have children components `Trigger, Popper, Title, Dot`.

```js
import { Tooltip } from '@semcore/d3-chart';

<Tooltip>
  <Tooltip.Title />
  <Tooltip.Dot />
</Tooltip>;
```

@typescript ITooltipProps

@## HoverLine

Component for show line after hover on chart.

```js
import { HoverLine } from '@semcore/d3-chart';
```

@typescript IHoverProps

@## HoverRect

Component for show sector after hover on chart.

```js
import { HoverRect } from '@semcore/d3-chart';
```

@typescript IHoverProps
