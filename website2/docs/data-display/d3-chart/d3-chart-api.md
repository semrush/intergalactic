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

@## Line

It have children components `Dots, Null`.

```js
import { Line } from '@semcore/d3-chart';

<Line>
  <Line.Dots />
  <Line.Null />
</Line>;
```

@typescript ILineProps

@## Bar

Chart Bar.

```js
import { Bar } from '@semcore/d3-chart';
```

@typescript IBarProps

@## HorizontalBar

Horizontal chart Bar.

```js
import { HorizontalBar } from '@semcore/d3-chart';
```

@typescript IHorizontalBarProps

@## StackBar

It have children components `Bar, HorizontalBar`.

```js
import { StackBar } from '@semcore/d3-chart';

<StackBar>
  <StackBar.Bar />
  <StackBar.HorizontalBar />
</StackBar>;
```

@typescript IStackBarProps

@## GroupBar

It have children components `Bar, HorizontalBar`.

```js
import { GroupBar } from '@semcore/d3-chart';

<GroupBar>
  <GroupBar.Bar />
  <GroupBar.HorizontalBar />
</GroupBar>;
```

@typescript IGroupBarProps

@## Area

It have children components `Dots, Null`.

```js
import { Area } from '@semcore/d3-chart';

<Area>
  <Area.Dots />
  <Area.Null />
</Area>;
```

@typescript IAreaProps

@## StackedArea

It have children components `Area`.

```js
import { StackedArea } from '@semcore/d3-chart';

<StackedArea>
  <StackedArea.Area />
</StackedArea>;
```

@typescript IStackedAreaProps

@## Donut

It have children components `Pie`, `Label`, `EmptyData`.

```js
import { Donut } from '@semcore/d3-chart';

<Donut>
  <Donut.EmptyData />
  <Donut.Pie />
  <Donut.Label />
</Donut>;
```

@typescript IDonutProps

@## Venn

It have children components `Circle`, `Intersection`.

```js
import { Venn } from '@semcore/d3-chart';

<Venn>
  <Venn.Circle />
  <Venn.Intersection />
</Venn>;
```

@typescript IVennProps

@## ScatterPlot

```js
import { ScatterPlot } from '@semcore/d3-chart';

<ScatterPlot />;
```

@typescript IScatterPlotProps

@## Bubble

```js
import { Bubble } from '@semcore/d3-chart';

<Bubble />;
```

@typescript IBubbleProps

@## Radial tree

It have children component `Title`.

```js
import { RadialTree } from '@semcore/d3-chart';

<RadialTree>
  <RadialTree.Radian>
    <RadialTree.Radian.Label />
    <RadialTree.Radian.Line />
    <RadialTree.Radian.Cap />
    <RadialTree.Radian.Icon />
  </RadialTree.Radian>
  <RadialTree.Title></RadialTree.Title>
</RadialTree>;
```

@typescript IRadialTreeProps
