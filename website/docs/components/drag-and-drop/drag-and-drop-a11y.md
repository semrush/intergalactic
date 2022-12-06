---
title: A11y
fileSource: drag-and-drop
a11y: AA
---

@## What component has

### Keyboard support

| Key                      | Function                                       |
| ------------------------ | ---------------------------------------------- |
| `Tab`                    | Moves focus to the next focusable element.     |
| `Shift+Tab`              | Moves focus to the previous focusable element. |
| `Space`                  | Select the focused object and start dragging.  |
| `Space` (while dragging) | Stop dragging.                                 |
| `Esc`                    | Discard dragging.                              |

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role    | Attribute                      | Element | Usage                                                                                                                                                                                                                               |
| ------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alert` |                                | `div`   | Identifies the element as the container where alert content will be added or updated.                                                                                                                                               |
|         | `aria-live="assertive"`        | `div`   | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. |
|         | `tabindex="0"`                 | `div`   | Makes the elements focusable and includes them in the page `Tab` sequence.                                                                                                                                                          |
|         | `aria-label` for grabbed item  | `div`   | Defines the string value or identifies the element (or elements) that provides an accessible name. Grabbed item will be read as: `${itemText} grabbed, current position is ${index + 1} of ${itemsCount}`.                          |
|         | `aria-label` for grabbing item | `div`   | Defines the string value or identifies the element (or elements) that provides an accessible name. Grabbing item will be read as: `Grabbing ${itemText}, drop position is ${itemIndex + 1} of ${itemsCount}`.                       |
|         | `aria-label` for dropped item  | `div`   | Defines the string value or identifies the element (or elements) that provides an accessible name. Dropped item will be read as: `${itemText} dropped, final position is ${index + 1} of ${itemsCount}`.                            |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include drag-and-drop-a11y-report
