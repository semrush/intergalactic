---
title: API
fileSource: spin-container
tabs: SpinContainer('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

## SpinContainer

```jsx
import SpinContainer from '@semcore/ui/spin-container';
<SpinContainer />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="SpinContainerProps" :types={...types} />

## SpinContainer.Content

Content wrapper with proper `position` and `z-index`.

```jsx
import SpinContainer from '@semcore/ui/spin-container';
<SpinContainer.Content />;
```

## SpinContainer.Overlay

By default, it is a UI component and a base that closes the content under `Spin`.

```jsx
import SpinContainer from '@semcore/ui/spin-container';
<SpinContainer.Overlay />;
```
