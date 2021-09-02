---
title: Recharts code
---

> 🎉 Try out [new chart library](/data-display/area-chart/area-chart-d3-code/) developed entirely with the D3.

@## An example of a simple use

@example simple-recharts

@## Complex example with filtering

@example complex-recharts

@## Increasing the sector by an event on the chart

A short instruction on how to achieve the desired result:

- `activeIndex` is responsible for allocating the active sector.

```jsx
import { Pie } from '@semcore/charts';
<Pie activeIndex={0} />;
```

- `activeShape` displays active sector by default. _The active sector size is `outerRadius + 8`._

```jsx
import {Pie, Sector} from '@semcore/charts'
<Pie outerRadius={40} activeShape={(props) => <Sector {...props}/>}>
```

- To ensure correct operation, you need to prepare data for `donut`. _This item is needed if your data does not have an `id` for sectors._

```jsx
import {Pie} from '@semcore/charts'
const data = [{ domain: 'tut.by', value: 35844 }, ...]
let  id = 0
const dataPie = data.reduce((acc, entry) => {
  if (domains.includes(entry.domain)) {
    return [...acc, { ...entry, id: id++ }];
  }
  return acc;
}, []);

<Pie data={dataPie}/>
```

- Add events to the sector. _List of events is specified in [API](http://recharts.org/en-US/api/Pie)._

```jsx
import {Pie} from '@semcore/charts'
<Pie onClick={...} />
```

- Congratulations, you now have an interactive chart 💪🏼

_If something went wrong, here's a working [example](https://i.semrush.com/data-display/donut-chart/donut-chart-code/#aa80d4)._

@## Data loading

@example skeleton-recharts
