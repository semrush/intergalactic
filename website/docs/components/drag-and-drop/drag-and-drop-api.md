---
title: API
---

@## DragAndDrop

Drag control component.

```jsx
import DnD from '@semcore/drag-and-drop;
<DnD />;
```

@interface IDragAndDropProps

@## DragAndDrop.Draggable

The element, which will be dragged.

```jsx
import DnD from '@semcore/drag-and-drop;
<DnD>
  <DnD.Draggable />
</DnD>
```

@interface IDraggableProps

@## DragAndDrop.Droppable

The area, to which the dragged element will be placed.

```jsx
import DnD from '@semcore/drag-and-drop;
<DnD>
  <DnD.Droppable />
</DnD>
```

Takes the same properties, as [Box](/layout/box-system/box-api/#a3cfce).
