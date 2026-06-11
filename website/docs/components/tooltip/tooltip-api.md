---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Examples('tooltip-code'), Changelog('tooltip-changelog')
---

::: tip New component 🎉
**Hint** is now separate from **Tooltip**. You can find its documentation in [Utils/Hint](../../utils/hint/hint-api).
:::

Read more about the differences between tooltip types in the [Design guide](./tooltip).

## Tooltip

```jsx
import Tooltip from '@semcore/ui/tooltip';
<Tooltip />;
```

<TypesView type="TooltipProps" :types={...types} />

## DescriptionTooltip

```jsx
import { DescriptionTooltip } from '@semcore/ui/tooltip';
<DescriptionTooltip />;
```

<TypesView type="DescriptionTooltipProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
