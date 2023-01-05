---
title: API
fileSource: drag-and-drop
---

@## DnD

Drag control component.

```jsx
import DnD from '@semcore/ui/drag-and-drop;
<DnD />;
```

@typescript IDragAndDropProps

@## DnD.Draggable

The element, which will be dragged.

```jsx
import DnD from '@semcore/ui/drag-and-drop;
<DnD>
  <DnD.Draggable />
</DnD>
```

@typescript IDraggableProps

@## DnD.DropZone

The area, to which the dragged element will be placed.

```jsx
import DnD from '@semcore/ui/drag-and-drop;
<DnD>
  <DnD.DropZone />
</DnD>
```

Takes the same properties, as [Box](/layout/box-system/box-api/#a3cfce).
