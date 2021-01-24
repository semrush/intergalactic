---
title: API
---

@## VennChart

For the first iteration, we used [recharts](http://recharts.org) and styled it. All exports are recharts exports. Please refer to [recharts API](http://recharts.org/en-US/api) for documentation and examples.

We tried to keep API as consistent as possible with respect to other charts.

```js
import { VennChart } from '@semcore/chart';
```

@interface IVennChartProps

### IVennDataItem

Data unit for the chart. In the data, the `name` key is required for the set, but not for the intersection.

@interface IVennDataItem

@## VennArea

Component for displaying a set in the chart.

```js
import { VennArea } from '@semcore/chart';
```

@interface IVennChildProps
