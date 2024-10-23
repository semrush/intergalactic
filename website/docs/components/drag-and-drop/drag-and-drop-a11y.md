---
title: Drag and drop
fileSource: drag-and-drop
a11y: AA
tabs: Design('drag-and-drop'), A11y('drag-and-drop-a11y'), API('drag-and-drop-api'), Example('drag-and-drop-code'), Changelog('drag-and-drop-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                       | Function                          |
| ------------------------- | --------------------------------- |
| `Tab`                     | Moves focus to the next focusable element.           |
| <nobr>`Shift + Tab`</nobr> | Moves focus to the previous focusable element. |
| `Space`                   | Grabs the focused object for dragging. If the object is already grabbed, drops it in the current position.      |
| `↓`, `↑`, `←`, `→`        | Moves the grabbed object in the direction indicated by the key.  |
| `Esc`                     | Discards dragging.                                    |

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Element                 | Attribute                      | Usage                                                                                                                                                                                                                               |
| ----------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DragAndDrop`           | `role="group"`                 | Identifies the entire area containing draggable objects and drop zones as a group.                 |
| `DragAndDrop.Draggable` | `role="group"`                 | Identifies the draggable object as a group. This is important for cases when draggable objects contain interactive elements.                |
|                         | `aria-describedby="IDREF"`     | Provides an accessible description for the draggable object, informing the user which key to press to grab the object. |
|                         | `tabindex="0"`                 | Makes the draggable object focusable.           |
| `DragAndDrop.DropZone`  | `role="group"`                 | Identifies the drop zone as a group.            |
| `div.A11yHint`          | `role="alert"`, `aria-live="assertive"` | Instructs assistive technology to announce current drag and drop status immediately, interrupting any other announcements.                 |

### ARIA-live notifications

The following table describes notifications announced by assistive technology during drag and drop.

| Action                      | Message template                                                           |
| --------------------------- | -------------------------------------------------------------------------- |
| User grabbed the object     | `{itemText} grabbed. Current position: {itemPosition} out of {itemsCount}. Use the arrows to change the position, Space to apply the new position, Escape to cancel.` |
| User moved the object       | `New position: {itemPosition} out of {itemsCount}`                         |
| User dropped the object     | `Position {itemPosition} applied`                                          |
| User canceled drag and drop | `Drag and drop canceled`                                                   |

If the grabbed item or the drop zone has a `zoneName`, messages will be as per the following table.

| Action                                               | Message template                                                                           |
|------------------------------------------------------|--------------------------------------------------------------------------------------------|
| User grabbed the object                              | `{itemText} grabbed, current position is {itemPosition} of {itemsCount} in {zoneName}`     |
| Object is over an empty drop zone                    | `Grabbing {itemText}, drop in {zoneName}`                                                  |
| Object is over a drop zone with other objects        | `Grabbing {itemText}, drop position is {itemPosition} of {itemsCount} in {zoneName}`       |
| Object is dropped in an empty drop zone              | `{itemText} dropped in {zoneName}`                                                         |
| Object is dropped in a drop zone with other objects  | `{itemText} dropped, final position is {itemPosition} of {itemsCount} in {zoneName}`       |

## Considerations for developers and designers

Set accessible names for `DragAndDrop`, `DragAndDrop.Draggable`, and `DragAndDrop.DropZone` using `aria-label` or `aria-labelledby`. This allows the user to recognize which objects can be dragged, and to which drag zones they can be dragged to.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./drag-and-drop-a11y-report.md-->
