---
title: Link
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Example('link-code'), Changelog('link-changelog')
---

## Link

A modified link component that can be `disabled` and have `Addon` elements. By default, the link is `inline-block` and `no-wrap` – that is, in most cases it's used as a stand-alone component.

```jsx
import Link from 'intergalactic/link';
<Link />;
```

<TypesView type="LinkProps" :types={...types} />

## Link.Addon

The addon inside the link (most often an icon) places the correct padding units depending on the size. Takes all properties of the `Box`.

```jsx
import Link from 'intergalactic/link';
<Link.Addon />;
```

## Link.Text

Plain text, it sets correct paddings depending on the size. If only text with no addons is used in the link, it will be wrapped in `Link.Text` automatically. Takes all properties of the `Box`.

```jsx
import Link from 'intergalactic/link';
<Link.Text />;
```

<script setup>import { data as types } from '@types.data.ts';</script>