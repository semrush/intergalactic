---
title: Icon
tabs: Design('icon'), A11y('icon-a11y'), API('icon-api'), Examples('icon-code'), Changelog('icon-changelog')
---

::: tip `@semcore/icon` is a separate package that needs to be installed manually.

::: code-group
```sh [pnpm]
pnpm add @semcore/icon
```

```sh [npm]
npm install @semcore/icon
```
:::

## Icon

Any icon can be obtained using a template.

```js
import IconNameSize from '@semcore/icon/iconName/size';
```

<TypesView type="IconProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
