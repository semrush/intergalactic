---
title: Flex-box and spacing system
fileSource: flex-box
tabs: Design('box-system'), API('box-api'), Changelog('box-changelog')
---

## Box

Component responsible for spacings and sizes 📐

```jsx
import { Box } from '@semcore/ui/base-components';
<Box />;
```

<TypesView type="BoxProps" :types={...types} />

## Flex

The layout building component is a wrapper over CSS-flex. It inherits all properties from `Box`.

```jsx
import { Flex } from '@semcore/ui/base-components';
<Flex />;
```

<TypesView type="FlexProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
