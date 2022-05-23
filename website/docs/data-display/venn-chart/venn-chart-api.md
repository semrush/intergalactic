---
title: API
fileSource: d3-chart
---

@## D3 API

It have children components `Circle`, `Intersection`.

```js
import { Venn } from '@semcore/d3-chart';

<Venn>
  <Venn.Circle />
  <Venn.Intersection />
</Venn>;
```

@typescript IVennProps

@## Recharts API

We used [recharts](http://recharts.org) and styled it. All exports are recharts exports. Please refer to [recharts API](http://recharts.org/en-US/api) for detailed documentation and examples.

We tried to keep API as consistent as possible with respect to other charts.

```js
import { VennChart } from '@semcore/chart';
```

@typescript IVennChartProps

### IVennDataItem

Data unit for the chart. In the data, the `name` key is required for the set, but not for the intersection.

@typescript IVennDataItem

### VennArea

Component for displaying a set in the chart.

```js
import { VennArea } from '@semcore/chart';
```

@typescript IVennChildProps
