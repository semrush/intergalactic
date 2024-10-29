---
title: Illustration
tabs: Design('illustration'), A11y('illustration-a11y'), API('illustration-api'), Example('illustration-code'), Changelog('illustration-changelog')
---

## Illustration

```jsx
import Coffee from 'intergalactic/illustration/Coffee';
<Coffee />;
```

<TypesView type="IllustrationProps" :types={...types} />

## Direct link

Any illustration can be obtained using a template.

```js
import IllustrationName from 'intergalactic/illustration/illustrationName';
```

## getIllustrationPath

To obtain any illustration, you can use the `getIllustrationPath` function, which returns the URL in the format `https://static.semrush.com/ui-kit/illustration/${version}/${name}.svg`.

<script setup>import { data as types } from '@types.data.ts';</script>
