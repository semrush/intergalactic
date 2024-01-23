---
title: Mini chart
tabs: Design('mini-chart'), A11y('mini-chart-a11y'), API('mini-chart-api'), Example('mini-chart-code'), Changelog('mini-chart-changelog')
---

## MiniCharts

```jsx
import MiniChart from '@semcore/mini-chart';
```


<TypesView type="ScoreLineGaugeProps" :types={...types} />
```jsx
<MiniChart.ScoreLine />
```

<TypesView type="ScoreDonutProps" :types={...types} />
```jsx
<MiniChart.ScoreDonut />
<MiniChart.ScoreSemiDonut />
```

<TypesView type="TrendLineProps" :types={...types} />
```jsx
<MiniChart.TrendLine />
<MiniChart.TrendArea />
```

<TypesView type="TrendBarProps" :types={...types} />
```jsx
<MiniChart.TrendBar />
<MiniChart.TrendHistogram />
```

<script setup>import { data as types } from '@types.data.ts';</script>
