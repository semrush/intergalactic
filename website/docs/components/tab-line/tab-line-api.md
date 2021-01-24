---
title: API
---

@## TabLine

Wrap over the tab elements.

```jsx
import TabLine from '@semcore/tab-line';
<TabLine />;
```

@interface ITabLineProps

@## TabLine.Item

This tab element may contain `Addon` and `Text`. The structure is similar to [Button](/components/button/). It takes some properties of the TabLine (for example, `size`, `disabled`) and can override them.

```jsx
import TabLine from '@semcore/tab-line';
<TabLine.Item />;
```

@interface ITabLineItemProps

@## TabLine.Item.Addon

The addon inside the tab (most commonly an icon) sets the correct indents depending on the size. It takes all the properties of the `Box`.

```jsx
import TabLine from '@semcore/tab-line';
<TabLine.Item.Addon />;
```

@## TabLine.Item.Text

This ordinary text sets the appropriate indents depending on the size. If a simple text without addons is used in the Tab, it will turn into `TabLine.Item.Text` automatically.

It takes all the properties of the `Box`.

```jsx
import TabLine from '@semcore/tab-line';
<TabLine.Item.Text />;
```
