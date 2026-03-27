---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Text

The main component for handling typography in our interfaces. Renders as a `span` tag by default.

```jsx
import { Text } from '@semcore/ui/typography';
<Text />;
```

<TypesView type="TextProps" :types={...types} />

## List

A list rendered with the `ul` tag. You can set a custom marker for all list items.

```jsx
import { List } from '@semcore/ui/typography';
<List />;
```

::: info
The `size` property of this component only accepts the values `100`, `200`, and `300`.
:::

<TypesView type="ListProps" :types={...types} />

## List.Item

A list item rendered with the `li` tag. You can set a custom marker and customize the content using `<List.Item.Content />`.

```jsx
import { List } from '@semcore/ui/typography';
<List.Item />;
<List.Item.Content />;
```

<TypesView type="ListItemProps" :types={...types} />
<TypesView type="ListItemContentProps" :types={...types} />

## Blockquote

A component for displaying quoted text.

```jsx
import { Blockquote } from '@semcore/ui/typography';
<Blockquote />;
```

<TypesView type="BlockquoteProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
