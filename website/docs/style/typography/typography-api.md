---
title: API
---

@## Text

It's a main component for text in our interfaces. By default, this is a `span` tag.

```jsx
import { Text } from '@semcore/ui/typography';
<Text />;
```

@typescript ITextProps

@## List

A list tagged with ʻul`. It's possible to set a custom marker for all items.

```jsx
import { List } from '@semcore/ui/typography';
<List />;
```

@typescript IListProps

@## List.Item

A list item tagged with `li`. It's possible to set a custom marker.

```jsx
import { List } from '@semcore/ui/typography';
<List.Item />;
```

@typescript IListItemProps

@## Blockquote

Quotes from great people 🙊

```jsx
import { Blockquote } from '@semcore/ui/typography';
<Blockquote />;
```

@typescript IBlockquoteProps

@## Hint

The hint is very similar to [Link](/components/link/) and has a similar structure from `Addon` + `Text`.

```jsx
import { Hint } from '@semcore/ui/typography';
<Hint>
  <Hint.Addon />
  <Hint.Text />
</Hint>;
```

@typescript IHintProps

@## FormatText

A wrapper component required to add styles to native tags.

> Note that the component is in another package `@semcore/ui/format-text`.

```jsx
import FormatText from '@semcore/ui/format-text';
<FormatText />;
```

@typescript IFormatTextProps
