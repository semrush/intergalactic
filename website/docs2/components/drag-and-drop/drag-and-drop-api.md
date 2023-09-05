---
title: API
fileSource: drag-and-drop
tabs: Drag and drop('index'), A11y('drag-and-drop-a11y'), API('drag-and-drop-api'), Example('drag-and-drop-code'), Changelog('drag-and-drop-changelog')
---

## DnD

Drag control component.

```jsx
import DnD from '@semcore/ui/drag-and-drop;
<DnD />;
```

<TypesView type="DragAndDropProps" :types={...types} />

## DnD.Draggable

The element, which will be dragged.

```jsx
import DnD from '@semcore/ui/drag-and-drop;
<DnD>
  <DnD.Draggable />
</DnD>
```

<TypesView type="DraggableProps" :types={...types} />

## DnD.DropZone

The area, to which the dragged element will be placed.

```jsx
import DnD from '@semcore/ui/drag-and-drop;
<DnD>
  <DnD.DropZone />
</DnD>
```

Takes the same properties, as [Box](/layout/box-system/box-api/#a3cfce).

<script setup>import { data as types } from '@types.data.ts';</script>