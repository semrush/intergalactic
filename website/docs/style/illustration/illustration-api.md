---
title: Illustration
tabs: Design('illustration'), A11y('illustration-a11y'), API('illustration-api'), Examples('illustration-code'), Changelog('illustration-changelog')
---

::: tip `@semcore/illustration` is a separate package that needs to be installed manually.

::: code-group
```sh [pnpm]
pnpm add @semcore/illustration
```

```sh [npm]
npm install @semcore/illustration
```
:::

## Illustration

```jsx
import Coffee from '@semcore/illustration/Coffee';
<Coffee />;
```

<TypesView type="IllustrationProps" :types={...types} />

## Direct link

Any illustration can be obtained using a template.

```js
import IllustrationName from '@semcore/illustration/illustrationName';
```

## getIllustrationPath

To obtain any illustration, you can use the `getIllustrationPath` function, which returns the URL in the format `https://static.semrush.com/ui-kit/illustration/${version}/${name}.svg`.

<script setup>import { data as types } from '@types.data.ts';</script>
