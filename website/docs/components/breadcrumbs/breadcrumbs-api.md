---
title: Breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## Breadcrumbs

Wrapper with the `nav` tag.

```jsx
import Breadcrumbs from '@semcore/ui/breadcrumbs';
<Breadcrumbs />;
```

<TypesView type="BreadcrumbsProps" :types={...types} />

## Breadcrumbs.Item

A page in a hierarchical navigation structure, with the `a` tag by default, if inactive. **The active item is usually the last one in the link hierarchy**.

```jsx
import Breadcrumbs from '@semcore/ui/breadcrumbs';
<Breadcrumbs.Item />;
```

<TypesView type="BreadcrumbsItemProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
