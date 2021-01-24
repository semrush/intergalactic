---
title: API
---

@## TabPanel

Wrap over the tab elements.

```jsx
import TabPanel from '@semcore/tab-panel';
<TabPanel />;
```

@interface ITabPanelProps

@## TabPanel.Item

The tab element may contain `Addon` and `Text`, its structure is similar to [Button](/components/button/). It takes some properties from TabLine (for example, `size`, `disabled`) and may override them.

> 💡 It is recommended to make tabs with links, so that the user can open a separate tab with the report with the right mouse button if necessary.

```jsx
import TabPanel from '@semcore/tab-panel';
<TabPanel.Item />;
```

@interface ITabPanelItemProps

@## TabPanel.Item.Addon

The addon inside the tab (most commonly an icon) sets the correct indents depending on the size.

It takes all the properties of the `Box`.

```jsx
import TabPanel from '@semcore/tab-panel';
<TabPanel.Item.Addon />;
```

@## TabPanel.Item.Text

This ordinary text sets the appropriate indents depending on the size. If a simple text without addons is used in the Tab, it will turn into `TabLine.Item.Text` automatically.

It takes all the properties of the `Box`.

```jsx
import TabPanel from '@semcore/tab-panel';
<TabPanel.Item.Text />;
```
