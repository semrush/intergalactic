---
title: API
fileSource: d3-chart
---

@## D3 API

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

@## Recharts API

```js
import { PieChart } from '@semcore/chart';
```

We used [recharts](http://recharts.org) and styled it. All exports are recharts exports. Please refer to [recharts API](http://recharts.org/en-US/api) for detailed documentation and examples.

### Donut

This component has undergone a few changes during the use. The main properties can be found [here](http://recharts.org/en-US/api/Pie). Some of them look like this:

@typescript IPieProps
