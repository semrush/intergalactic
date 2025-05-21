---
title: SidePanel
fileSource: side-panel
tabs: Design('side-panel'), A11y('side-panel-a11y'), API('side-panel-api'), Example('side-panel-code'), Changelog('side-panel-changelog')
---

## SidePanel

```jsx
import SidePanel from '@semcore/ui/side-panel';
<SidePanel />;
```

<TypesView type="SidePanelProps" :types={...types} />

## SidePanel.Overlay

```jsx
import SidePanel from '@semcore/ui/side-panel';
<SidePanel.Overlay />;
```

This is a wrap over the [Box](/layout/box-system/box-api#box) component.

## SidePanel.Panel

```jsx
import SidePanel from '@semcore/ui/side-panel';
<SidePanel.Panel />;
```

This is a wrap over [Box](/layout/box-system/box-api#box) and `FocusLock`.

<TypesView type="SidePanelPanelProps" :types={...types} />

## SidePanel.Close

```jsx
import SidePanel from '@semcore/ui/side-panel';
<SidePanel.Close />;
```

This is a wrap over the [Box](/layout/box-system/box-api#box) component.

<script setup>import { data as types } from '@types.data.ts';</script>
