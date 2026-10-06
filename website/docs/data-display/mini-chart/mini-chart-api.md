---
title: Mini chart
tabs: Design('mini-chart'), A11y('mini-chart-a11y'), API('mini-chart-api'), Examples('mini-chart-code'), Changelog('mini-chart-changelog')
---

## Score charts

```jsx
import MiniChart from '@semcore/ui/mini-chart';
```

<TypesView type="NSMiniChart.Score.CommonProps" :types={...types} />

<TypesView type="NSMiniChart.Score.Line.Props" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.ScoreLine />
```

<TypesView type="NSMiniChart.Score.Donut.Props" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.ScoreDonut />
<MiniChart.ScoreSemiDonut />
```

## Trend charts

<TypesView type="NSMiniChart.Trend.CommonProps" :types={...types} />

<TypesView type="NSMiniChart.Trend.Line.Props" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.TrendLine />
<MiniChart.TrendArea />
```

<TypesView type="NSMiniChart.Trend.Bar.Props" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.TrendBar />
<MiniChart.TrendHistogram />
```

<script setup>import { data as types } from '@types.data.ts';</script>
