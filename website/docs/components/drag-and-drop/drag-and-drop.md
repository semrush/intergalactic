---
title: Drag and drop
fileSource: drag-and-drop
tabName: Design
---

@## Description

**Drag and drop** is a component that allows user to move elements within the interface, changing their order and sometimes their properties.

> One common use case is reordering columns in a table, using dropdowns known as "Table settings controls".

The component imitates the physical dragging of objects, and two essential considerations for this are:

- Clearly indicating which interface elements can be dragged and where.
- Providing visual cues during dragging to show that the element is being moved and where it can be placed.

### Component composition

`DnD` is a container that wraps the necessary area for drag and drop functionality. The `DropZone` is where the element can be dropped, and the `Draggable` is the element you can move.

![](static/dragdrop-scheme.png)

@## Appearance

### Icon for identification of the possibility to drag the object

When hovering over a draggable element, it's recommended to display the `MoveAlt` icon, which should use the `--icon-secondary-neutral` token for its color.

![](static/drag-hover.png)

### Shadow of the object which can be dragged

`--box-shadow-dnd` token is used for the shadow.

![](static/dragging.png)

@## Area for dragging

The area for dragging is where you can click and hold the mouse or use the keyboard to move a large object, like a card or table row. We recommend using the dotted pattern that appears when user hovers over the area or use the `Tab` key to navigate to the element. This pattern can be placed both horizontally, as in the case of cards, and vertically, as in table rows.

![](static/draggable-card.png)

![](static/drag-table.png)

@## Area for dropping

By default, the element's placement area is marked with a dashed border. If user hovers over this area, its styles should remain unchanged to avoid giving the impression that it is clickable.

Use `border: 1px dashed var(--border-primary)` for border styles.

![](static/droppable-zone.png)

![](static/default-and-hover.png)

@## Area highlighting

When the object is dragged to the area where the element can be placed, area must be highlighted.

Use `--bg-primary-neutral-hover` token for background-color and `border: 1px dashed var(--border-primary)` for border styles.

![](static/dragging.png)

![](static/drag-card.png)

@## Where to use

| Component                                | Appearance example                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Accordion](/components/accordion/)       | ![](static/drag-accordion.png)                                                |
| [Card](/components/card/)                 | ![](static/draggable-card.png) ![](static/drag-card.png)      |
| [Table](/table-group/table/)              | ![](static/drag-table.png) ![](static/drag-table2.png)      |
| [TabPanel](/components/tab-panel/)        | ![](static/drag-tabpanel.png)                                                  |
| [Select/Multiselect](/components/select/) | ![](static/drag-default.png) ![](static/dragging.png) |

@## Interaction

### Cursor

When dragging either a clickable or non-clickable element, a long click on any part of the element will change the cursor to a "move" cursor, indicating that dragging has begun.

### States of draggable element

When dragging, the axis is not restricted, allowing the element to be moved anywhere on the page but only added to certain areas.

| State    | Appearance example                                              | Description                                                                                                                                                                                                                                                                                                        |
| -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default  | ![](static/drag-default.png)                             | Do not show the `MoveAlt` icon and pattern with dots in default state.                                                                                                                                                                                                                                        |
| Hover    | ![](static/drag-hover.png) ![](static/drag-table.png) | If the element is hovered over, a `MoveAlt` icon or pattern with dots is displayed, indicating that the component can be moved. If the `MoveAlt` icon is hovered over, the cursor changes to `move`. |
| dragging | ![](static/dragging.png)                            | The dragged object changes its box-shadow to the `--box-shadow-dnd` token.                                                                                                                                                                                                                                    |
| no-drop  | ![](static/no-drop.png)                                  | If the drop zone under the dragged object is unavailable, the cursor changes to `not-allowed`.                                                                                                                                                                                                           |

### States of droppable area

| State    | Appearance example                                                                        | Description                                                                                                                                                                                                                                                                               |
| -------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Default  | ![](static/droppable-zone.png)                                              | By default, the area where the element can be placed is marked with a dashed border. You can place text inside this area to describe what can be dropped there, using the secondary text color (`--text-secondary`) that is appropriate for the context. |
| Hover    | ![](static/default-and-hover.png)                                           | The border color of the area where an object can be dragged is not changed when hovered over.                                                                                                                                                                                   |
| dragging | ![](static/drag-card.png) ![](static/drag-table2.png) | Hovering over the area where an element can be dropped changes its color. When dragging an object in a list of similar objects, they are separated, and the drop zone changes the background color to `--bg-secondary-neutral-hover`.       |
| no-drop  | ![](static/no-drop.png)                                                            | If the drop zone under the dragged object is unavailable, the cursor changes to `not-allowed`.                                                                                                                                                                             |

@## Usage in UX/UI

This component imitates physically dragging objects, so keep the following in mind when implementing it:

- Visually indicate that the element is draggable using icons or text.
- Display the area where the element can be placed.
- Avoid placing the draggable element and its drop area too far apart.

> Use appropriate cursors such as `move`, `grab`, or `grabbing` when interacting with draggable elements.

Note that short and long clicks have different meanings, with long clicks used for clickable draggable objects.

Apply the required styles to show that an element is being dragged during the `DragEvent`.

@page drag-and-drop-a11y
@page drag-and-drop-api
@page drag-and-drop-code
@page drag-and-drop-changelog
