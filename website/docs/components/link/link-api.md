---
title: Link
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Examples('link-code'), Changelog('link-changelog')
---

## Link

A modified link component that can be `disabled` and have `Addon` elements. By default, the link is `inline-block` and `no-wrap` – that is, in most cases it's used as a stand-alone component.

```jsx
import Link from '@semcore/ui/link';
<Link />;
```

<TypesView type="LinkProps" :types={...types} />

## Link.Addon

The addon inside the link (most often an icon) places the correct padding units depending on the size. Accepts all properties of [Box](../../layout/box-system/box-system-api#box).

```jsx
import Link from '@semcore/ui/link';
<Link.Addon />;
```

## Link.Text

Plain text with predefined paddings depending on the size. Accepts all properties of [Text](../../style/typography/typography-api#text).

If only text with no addons is used, it will be wrapped in `Link.Text` automatically.

```jsx
import Link from '@semcore/ui/link';
<Link.Text />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
