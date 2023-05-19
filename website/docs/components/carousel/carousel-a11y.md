---
title: A11y
a11y: AA
---

## What component has

### Keyboard support

| Key                                  | Function                                                                                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                                | Moves focus through interactive elements in the carousel. Rotation control, previous slide, and next slide buttons precede the slide content in the `Tab` sequence. |
| `Shift + Tab`                        | Moves focus to the previous focusable element.                                                                                                                      |
| `Enter`, `Left Arrow`, `Right Arrow` | Display next or previous slide in the carousel.                                                                                                                     |

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role       | Attribute      | Element | Usage                                                                                                  |
| ---------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------ |
|            | `tabindex="0"` | `div`   | Includes the element in the `Tab` sequence.                                                            |
| `list`     |                |         | The ARIA `list` role can be used to identify a list of items. It is used to identify a list container. |
| `listitem` |                |         | The ARIA `listitem` role can be used to identify an item inside a list of items.                       |

## Resources

- Mozilla guides about [list role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) and [listitem role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role) have all necessary information for better understanding of how list works with screen readers.
- [W3 carousel examples](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) has detailed information about the accordion accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include carousel-a11y-report
