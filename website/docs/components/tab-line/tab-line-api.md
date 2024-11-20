---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

## TabLine

Wrap over the tab elements.

```jsx
import TabLine from '@semcore/ui/tab-line';
<TabLine />;
```

<TypesView type="TabLineProps" :types={...types} />

## TabLine.Item

This tab element may contain `Addon` and `Text`. The structure is similar to [Button](/components/button/button). It takes some properties of the TabLine (for example, `size`, `disabled`) and can override them.

```jsx
import TabLine from '@semcore/ui/tab-line';
<TabLine.Item />;
```

<TypesView type="TabLineItemProps" :types={...types} />

## TabLine.Item.Addon

The addon inside the tab (most commonly an icon) sets the correct indents depending on the size. It takes all the properties of the `Box`.

```jsx
import TabLine from '@semcore/ui/tab-line';
<TabLine.Item.Addon />;
```

## TabLine.Item.Text

This ordinary text sets the appropriate indents depending on the size. If a simple text without addons is used in the Tab, it will turn into `TabLine.Item.Text` automatically.

It takes all the properties of the `Box`.

```jsx
import TabLine from '@semcore/ui/tab-line';
<TabLine.Item.Text />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
