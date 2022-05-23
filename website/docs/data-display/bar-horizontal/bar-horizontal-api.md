---
title: API
fileSource: d3-chart
---

@## D3 API

@## HorizontalBar

Horizontal chart Bar.

```js
import { HorizontalBar } from '@semcore/d3-chart';
```

@typescript IHorizontalBarProps

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

@## Recharts API

```js
import { BarChart } from '@semcore/chart';
```

We used [recharts](http://recharts.org) and styled it. All exports are recharts exports. Please refer to [recharts API](http://recharts.org/en-US/api) for detailed documentation and examples.
