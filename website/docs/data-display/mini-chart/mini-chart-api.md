---
title: Mini chart
tabs: Design('mini-chart'), A11y('mini-chart-a11y'), API('mini-chart-api'), Example('mini-chart-code'), Changelog('mini-chart-changelog')
---

## Score charts

```jsx
import MiniChart from '@semcore/ui/mini-chart';
```

<TypesView type="CommonScoreProps" :types={...types} />

<TypesView type="ScoreLineGaugeProps" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.ScoreLine />
```

<TypesView type="ScoreDonutProps" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.ScoreDonut />
<MiniChart.ScoreSemiDonut />
```

## Trend charts

<TypesView type="CommonTrendProps" :types={...types} />

<TypesView type="TrendLineProps" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.TrendLine />
<MiniChart.TrendArea />
```

<TypesView type="TrendBarProps" :types={...types} />
```jsx
import MiniChart from '@semcore/ui/mini-chart';
<MiniChart.TrendBar />
<MiniChart.TrendHistogram />
```

<script setup>import { data as types } from '@types.data.ts';</script>
