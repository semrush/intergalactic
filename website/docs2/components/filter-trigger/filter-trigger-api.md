---
title: API
fileSource: base-trigger
tabs: FilterTrigger('filter-trigger'), A11y('filter-trigger-a11y'), API('filter-trigger-api'), Example('filter-trigger-code'), Changelog('filter-trigger-changelog')
---

## BaseTrigger

Basic trigger-button for all dropdowns.

```js
import { BaseTrigger } from '@semcore/ui/base-trigger';
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="BaseTriggerProps" :types={...types} />

## ButtonTrigger

Button-trigger with the `ChevronDownM` icon.

```js
import { ButtonTrigger } from '@semcore/ui/base-trigger';
```

<TypesView type="ButtonTriggerProps" :types={...types} />

## LinkTrigger

This trigger looks like a link with the `ChevronDownM` icon.

```js
import { LinkTrigger } from '@semcore/ui/base-trigger';
```

<TypesView type="LinkTriggerProps" :types={...types} />

## FilterTrigger

Trigger for filters.

```js
import { FilterTrigger } from '@semcore/ui/base-trigger';
```

<TypesView type="FilterTriggerProps" :types={...types} />
