---
title: FeaturePopover
fileSource: feature-popover
tabs: Design('feature-popover'), A11y('feature-popover-a11y'), API('feature-popover-api'), Example('feature-popover-code'), Changelog('feature-popover-changelog')
---

## FeaturePopover

This is a wrap component, which is completely inherited from `<Popper/>`.

```jsx
import FeaturePopover from 'intergalactic/feature-popover';
<FeaturePopover />;
```

<TypesView type="PopperProps" :types={...types} />

## FeaturePopover.Trigger

This is the element, to which `<FeaturePopover.Popper/>` will be attached. It's fully inherited from `<Popper.Trigger/>`.

```jsx
import FeaturePopover from 'intergalactic/feature-popover';
<FeaturePopover.Trigger />;
```

<TypesView type="PopperTriggerProps" :types={...types} />

## FeaturePopover.Popper

This is the element, to which `<FeaturePopover.Trigger/>` will be attached. It's fully inherited from `<Popper.Popper/>`.

```jsx
import FeaturePopover from 'intergalactic/feature-popover';
<FeaturePopover.Popper />;
```

<TypesView type="FeaturePopoverPopperProps" :types={...types} />

## FeaturePopover.Spot

This blinking circle is inherited from `<Box>`.

```jsx
import FeaturePopover from 'intergalactic/feature-popover';
<FeaturePopover.Spot />;
```

<script setup>import { data as types } from '@types.data.ts';</script>