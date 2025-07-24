---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Text

It's a main component for text in our interfaces. By default, this is a `span` tag.

```jsx
import { Text } from '@semcore/typography';
<Text />;
```

<TypesView type="TextProps" :types={...types} />

## List

A list tagged with ʻul`. It's possible to set a custom marker for all items.

```jsx
import { List } from '@semcore/typography';
<List />;
```

<TypesView type="ListProps" :types={...types} />

## List.Item

A list item tagged with `li`. It's possible to set a custom marker.
Also, it is possible to customise content with `<List.Item.Content />`;

```jsx
import { List } from '@semcore/typography';
<List.Item />;
<List.Item.Content />;
```

<TypesView type="ListItemProps" :types={...types} />
<TypesView type="ListItemContentProps" :types={...types} />

## Blockquote

Quotes from great people 🙊

```jsx
import { Blockquote } from '@semcore/typography';
<Blockquote />;
```

<TypesView type="BlockquoteProps" :types={...types} />

## FormatText

::: warning
`FormatText` is deprecated. To style native tags, wrap them in `Text`. Refer to the [Native typography tags example](./typography-code#native-typography-tags)
:::

<script setup>import { data as types } from '@types.data.ts';</script>
