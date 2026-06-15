---
title: SpinContainer
fileSource: spin-container
tabs: Design('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Examples('spin-container-code'), Changelog('spin-container-changelog')
---

## SpinContainer

```jsx
import SpinContainer from '@semcore/ui/spin-container';
<SpinContainer />;
```

<TypesView type="NSSpinContainer.Props" :types={...types} />

## SpinContainer.Content

Content wrapper with proper `position` and `z-index`.

```jsx
import SpinContainer from '@semcore/ui/spin-container';
<SpinContainer.Content />;
```

## SpinContainer.Overlay

A semitransparent box with a [Spin](../spin/spin.md) displayed over the content.

```jsx
import SpinContainer from '@semcore/ui/spin-container';
<SpinContainer.Overlay />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
