---
title: Flex-box
fileSource: flex-box
tabs: Spacing system('box-system-spacing'), API('box-system-api'), Examples('box-system-code'), Changelog('box-system-changelog')
---

## Box

Component responsible for spacings and sizes 📐

```jsx
import { Box } from '@semcore/ui/base-components';
<Box />;
```

<TypesView type="NSBox.Props" :types={...types} />

## Flex

The layout building component is a wrapper over CSS-flex. It inherits all properties from `Box`.

```jsx
import { Flex } from '@semcore/ui/base-components';
<Flex />;
```

<TypesView type="NSFlex.Props" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
