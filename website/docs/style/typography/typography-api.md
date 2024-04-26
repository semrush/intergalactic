---
title: Typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Text

It's a main component for text in our interfaces. By default, this is a `span` tag.

```jsx
import { Text } from 'intergalactic/typography';
<Text />;
```

<TypesView type="TextProps" :types={...types} />

## List

A list tagged with ʻul`. It's possible to set a custom marker for all items.

```jsx
import { List } from 'intergalactic/typography';
<List />;
```

<TypesView type="ListProps" :types={...types} />

## List.Item

A list item tagged with `li`. It's possible to set a custom marker.
Also, it is possible to customise content with `<List.Item.Content />`;

```jsx
import { List } from 'intergalactic/typography';
<List.Item />;
<List.Item.Content />;
```

<TypesView type="ListItemProps" :types={...types} />
<TypesView type="ListItemContentProps" :types={...types} />

## Blockquote

Quotes from great people 🙊

```jsx
import { Blockquote } from 'intergalactic/typography';
<Blockquote />;
```

<TypesView type="BlockquoteProps" :types={...types} />

## Hint

The hint is very similar to [Link](/components/link/link) and has a similar structure from `Addon` + `Text`.

```jsx
import { Hint } from 'intergalactic/typography';
<Hint>
  <Hint.Addon />
  <Hint.Text />
</Hint>;
```

<TypesView type="TypographyHintProps" :types={...types} />

## FormatText

A wrapper component required to add styles to native tags.

::: tip
Note that the component is in another package `intergalactic/format-text`.
:::

```jsx
import FormatText from 'intergalactic/format-text';
<FormatText />;
```

<TypesView type="FormatTextProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
