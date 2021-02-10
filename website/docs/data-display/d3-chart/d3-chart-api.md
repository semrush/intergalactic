---
title: API
---

@## XYPlot

Root element for all charts.

```js
import { XYPlot } from '@semcore/d3-chart';
```

@interface IXYPlotProps

@## Axis

It have children components `Ticks, Grid`.

```js
import { XAxis, YAxis } from '@semcore/d3-chart';

<XAxis>
  <XAxis.Ticks />
  <XAxis.Grid />
</XAxis>;
```

@interface IXAxisProps
@interface IYAxisProps

@## ResponsiveContainer

Container watch to size block.

```js
import { ResponsiveContainer } from '@semcore/d3-chart';
```

@interface IResponsiveContainerProps

@## Tooltip

It have children components `Trigger, Popper, Title, Dot`.

```js
import { Tooltip } from '@semcore/d3-chart';

<Tooltip>
  <Tooltip.Title />
  <Tooltip.Dot />
</Tooltip>;
```

@interface ITooltipProps

@## HoverLine

Component for show line after hover on chart.

```js
import { HoverLine } from '@semcore/d3-chart';
```

@interface IHoverProps

@## HoverRect

Component for show sector after hover on chart.

```js
import { HoverRect } from '@semcore/d3-chart';
```

@interface IHoverProps

@## Line

It have children components `Dots, Null`.

```js
import { Line } from '@semcore/d3-chart';

<Line>
  <Line.Dots />
  <Line.Null />
</Line>;
```

@interface ILineProps

@## Bar

Chart Bar.

```js
import { Bar } from '@semcore/d3-chart';
```

@interface IBarProps

@## HorizontalBar

Horizontal chart Bar.

```js
import { HorizontalBar } from '@semcore/d3-chart';
```

@interface IHorizontalBarProps

@## StackBar

Horizontal chart Bar.

```js
import { HorizontalBar } from '@semcore/d3-chart';
```

@interface IHorizontalBarProps

@## StackBar

It have children components `Bar, HorizontalBar`.

```js
import { StackBar } from '@semcore/d3-chart';

<StackBar>
  <StackBar.Bar />
  <StackBar.HorizontalBar />
</StackBar>;
```

@interface IStackBarProps

@## GroupBar

It have children components `Bar, HorizontalBar`.

```js
import { GroupBar } from '@semcore/d3-chart';

<GroupBar>
  <GroupBar.Bar />
  <GroupBar.HorizontalBar />
</GroupBar>;
```

@interface IGroupBarProps
