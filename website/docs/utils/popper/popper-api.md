---
title: Popper
fileSource: popper
tabs: Design('popper'), API('popper-api'), Changelog('popper-changelog')
---

## Popper

This is a wrapper for creating a context, which doesn't create additional nodes in the house.

```jsx
import Popper from '@semcore/ui/popper';
<Popper />;
```

<TypesView type="PopperProps" :types={...types} />

## Popper.Trigger

The element to which `<Popper.Popper/>` will be attached.

```jsx
import Popper from '@semcore/ui/popper';
<Popper.Trigger />;
```

<TypesView type="PopperTriggerProps" :types={...types} />

## Popper.Popper

The element which will be attached to `<Popper.Trigger/>`.

```jsx
import Popper from '@semcore/ui/popper';
<Popper.Popper />;
```

<TypesView type="PopperPopperProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
