---
title: Popper
fileSource: popper
tabs: Design('popper'), API('popper-api'), Changelog('popper-changelog')
---

## Popper

This is a wrapper for creating a context, which doesn't create additional nodes in the DOM.

```jsx
import { Popper } from '@semcore/ui/base-components';
<Popper />;
```

<TypesView type="NSPopper.Props" :types={...types} />

## Popper.Trigger

The element to which `<Popper.Popper/>` will be attached.

```jsx
import { Popper } from '@semcore/ui/base-components';
<Popper.Trigger />;
```

<TypesView type="NSPopper.Trigger.Props" :types={...types} />

## Popper.Popper

The element which will be attached to `<Popper.Trigger/>`.

```jsx
import { Popper } from '@semcore/ui/base-components';
<Popper.Popper />;
```

<TypesView type="NSPopper.Popper.Props" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
