---
title: API
fileSource: sticky
tabs: Sticky('sticky'), API('sticky-api'), Changelog('sticky-changelog')
---

::: tip
This component doesn't work properly inside the iframe.
:::

## Sticky

The component is a wrap over CSS `position: sticky`.

```js
import Sticky from '@semcore/ui/sticky';
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="StickyProps" :types={...types} />
