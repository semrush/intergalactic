---
title: FeaturePopover
fileSource: feature-popover
tabs: Design('feature-popover'), A11y('feature-popover-a11y'), API('feature-popover-api'), Examples('feature-popover-code'), Changelog('feature-popover-changelog')
---

## FeaturePopover

This is a wrap component, which is inherited from `<Popper/>`.

```jsx
import FeaturePopover from '@semcore/ui/feature-popover';
<FeaturePopover />;
```

<TypesView type="NSFeaturePopover.Props" :types={...types} />

## FeaturePopover.Trigger

The element to which `<FeaturePopover.Popper/>` will be attached. Inherits all [`Box`](../../layout/box-system/box-system-api#box) properies.

```jsx
import FeaturePopover from '@semcore/ui/feature-popover';
<FeaturePopover.Trigger />;
```

## FeaturePopover.Popper

The element with the `FeaturePopover` content. It's inherited from `<Popper.Popper/>`.

```jsx
import FeaturePopover from '@semcore/ui/feature-popover';
<FeaturePopover.Popper />;
```

<TypesView type="NSFeaturePopover.Popper.Props" :types={...types} />

## FeaturePopover.Spot

This blinking circle is inherited from [`Box`](../../layout/box-system/box-system-api#box).

```jsx
import FeaturePopover from '@semcore/ui/feature-popover';
<FeaturePopover.Spot />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
