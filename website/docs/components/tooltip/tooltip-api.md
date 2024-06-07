---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

`Tooltip` package contains three components for different use cases:

1. Use `Hint` if you only need to display element's label on hover/focus.
2. Use `Tooltip` to display additional information for an interactive element on hover/focus (for example, a short description for a button or a link).
3. Use `DescriptionTooltip` for the [Informer pattern](../../patterns/informer/informer), that is, if the trigger's only function is to show the tooltip, or if your tooltip must contain several paragraphs and/or interactive elements. This type of tooltip is triggered by click/Enter/Space.

## Tooltip

```jsx
import Tooltip from 'intergalactic/tooltip';
<Tooltip />;
```

<TypesView type="TooltipProps" :types={...types} />

## Hint

```jsx
import { Hint } from 'intergalactic/tooltip';
<Hint />;
```

<TypesView type="TooltipHintProps" :types={...types} />

## DescriptionTooltip

```jsx
import { DescriptionTooltip } from 'intergalactic/tooltip';
<DescriptionTooltip />;
```

<TypesView type="DescriptionTooltipProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
