---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

`Tooltip` package contains three components: `Tooltip`, `Hint` and `DescriptionTooltip`. Use the correct component to ensure best usability and accessibility. 

## Tooltip

Use `Tooltip` to display additional information for a trigger with a visible name.

```jsx
import Tooltip from 'intergalactic/tooltip';
<Tooltip />;
```

<TypesView type="TooltipProps" :types={...types} />

## Hint

Use `Hint` to display a label for a trigger without a visible name.

```jsx
import { Hint } from 'intergalactic/tooltip';
<Hint />;
```

<TypesView type="TooltipHintProps" :types={...types} />

## DescriptionTooltip

Use `DescriptionTooltip` for the [Informer pattern](../../patterns/informer/informer) (i.e. if the trigger's only function is to show the tooltip), or if your tooltip must contain interactive elements.

```jsx
import { DescriptionTooltip } from 'intergalactic/tooltip';
<DescriptionTooltip />;
```

<TypesView type="DescriptionTooltipProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>