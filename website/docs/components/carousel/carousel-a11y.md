---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

@table-caption Keyboard support

| Key                             | Function                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                           | Moves focus through interactive elements in the carousel. Rotation control, previous slide, and next slide buttons precede the slide content in the `Tab` sequence. |
| `Shift + Tab`                   | Moves focus to the previous focusable element.                                                                                                                      |
| `Enter`, `Left Arrow`, `Right Arrow` | Display next or previous slide in the carousel.                                                                                                                     |

### Roles and attributes

The list below describes roles and attributes that component already has.

@table-caption Roles and attributes

| Role       | Attribute      | Element | Usage                                                                                                  |
| ---------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------ |
|            | `tabindex="0"` | `div`   | Includes the element in the `Tab` sequence.                                                            |
| `list`     |                |         | The ARIA `list` role can be used to identify a list of items. It is used to identify a list container. |
| `listitem` |                |         | The ARIA `listitem` role can be used to identify an item inside a list of items.                       |
|            | `aria-current="active"` | `div`   | `aria-current` state on an element indicates that this element represents the current item within a container or set of related elements. |
|            | `aria-label="Previous"`            | `button`   | Defines a string value that labels button that opens previous list item. It is a required for buttons without text content.  |
|            | `aria-label="Next"`            | `button`   | Defines a string value that labels button that opens next list item. It is a required for buttons without text content.  |

@## Considerations for developers and designers

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

@table-caption Attributes

| Attribute         | Element | Usage                                                                                                                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label="Previous"`            | `button`   | Defines a string value that labels button that opens previous list item. It is a required for buttons without text content. You can change the `aria-label` for this button to specify the list item.  |
| `aria-label="Next"`            | `button`   | Defines a string value that labels button that opens next list item. It is a required for buttons without text content. You can change the `aria-label` for this button to specify the list item.  |

@## Resources

- Mozilla guides about [list role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) and [listitem role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role) have all necessary information for better understanding of how list works with screen readers.
- [W3 carousel examples](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) has detailed information about the accordion accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include carousel-a11y-report
