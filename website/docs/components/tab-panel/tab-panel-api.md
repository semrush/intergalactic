---
title: TabPanel
fileSource: tab-panel
a11y: AA
tabs: Design('tab-panel'), A11y('tab-panel-a11y'), API('tab-panel-api'), Example('tab-panel-code'), Changelog('tab-panel-changelog')
---

## TabPanel

Wrap over the tab elements.

```jsx
import TabPanel from '@semcore/ui/tab-panel';
<TabPanel />;
```

<TypesView type="TabPanelProps" :types={...types} />

## TabPanel.Item

The tab element may contain `Addon` and `Text`, its structure is similar to [Button](/components/button/button). It takes some properties from TabLine (for example, `size`, `disabled`) and may override them.

::: tip
It's recommended to use links in tabs, so that user can open them in a new browser tab or window, or copy their URL.
:::

```jsx
import TabPanel from '@semcore/ui/tab-panel';
<TabPanel.Item />;
```

<TypesView type="TabPanelItemProps" :types={...types} />

## TabPanel.Item.Addon

The addon inside the tab (most commonly an icon) sets the correct indents depending on the size.

It takes all the properties of the `Box`.

```jsx
import TabPanel from '@semcore/ui/tab-panel';
<TabPanel.Item.Addon />;
```

## TabPanel.Item.Text

An instance of [`Text`](../../style/typography/typography-api#text) with the appropriate styles depending on the TabPanel size.

Plain text without addons placed directly in `TabPanel.Item` is wrapped in `TabPanel.Item.Text` automatically.

```jsx
import TabPanel from '@semcore/ui/tab-panel';
<TabPanel.Item.Text />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
