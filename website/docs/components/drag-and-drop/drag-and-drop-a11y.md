---
title: Drag and drop
fileSource: drag-and-drop
a11y: AA
tabs: Design('drag-and-drop'), A11y('drag-and-drop-a11y'), API('drag-and-drop-api'), Example('drag-and-drop-code'), Changelog('drag-and-drop-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                      | Function                          |
| ------------------------ | --------------------------------- |
| `Tab` | Moves focus to the next focusable element.           |
| `Shift+Tab` | Moves focus to the previous focusable element. |
| `Space` | Selects the focused object and start dragging.      |
| `↓`, `↑`, `←`, `→` arrow keys | Move the focused object in the direction indicated by the key.  |
| `Space` (while dragging) | Stops dragging.                    |
| `Esc` | Discards dragging.                                    |

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Role    | Attribute                      | Element | Usage                                                                                                                                                                                                                               |
| ------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alert` |                                | `div` | Identifies the element as the container where alert content will be added or updated.                                                                                                                                               |
|         | `aria-live="assertive"` | `div` | This doesn't have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. |
|         | `tabIndex="0"` | `div` | Makes the elements focusable and includes them in the page `Tab` sequence.                                                                                                                                                          |

### Aria-live messages

Text message for assistive technologies that will be read when the user interacts with the component.

| Action                | Message template                                                           |
| --------------------- | -------------------------------------------------------------------------- |
| Item was just grabbed | `${itemText} grabbed, current position is ${index + 1} of ${itemsCount}` |
| Item is grabbing      | `Grabbing ${itemText}, drop position is ${itemIndex + 1} of ${itemsCount}` |
| Item is dropped       | `${itemText} dropped, final position is ${index + 1} of ${itemsCount}` |

If grabbed item or zone to drop has `zoneName`, messages will be like in the follow table.

| Action                                          | Message template                                                                           |
|-------------------------------------------------|--------------------------------------------------------------------------------------------|
| Item was just grabbed                           | `${itemText} grabbed, current position is ${itemPosition} of ${itemsCount} in ${zoneName}` |
| Item is grabbing over area with another items   | `Grabbing ${itemText}, drop position is ${itemPosition} of ${itemsCount} in ${zoneName}`   |
| Item is grabbing over area without any items    | `Grabbing ${itemText}, drop in ${zoneName}`                                                |
| Item is dropped in drop zone with another items | `${itemText} dropped, final position is ${itemPosition} of ${itemsCount} in ${zoneName}`   |
| Item is dropped in drop zone without any items  | `${itemText} dropped in ${zoneName}`                                                       |


## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./drag-and-drop-a11y-report.md-->
