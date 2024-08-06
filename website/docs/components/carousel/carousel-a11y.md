---
title: Carousel
a11y: AA
tabs: Design('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                             | Function                                              |
| ------------------------------- | ----------------------------------------------------- |
| `Tab`                           | Moves focus to the carousel.                          |
| `Shift + Tab`                   | Moves focus to the previous focusable element.        |
| `Left Arrow` , `Right Arrow`    | Display next or previous slide in the carousel.       |

### Roles and attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Attribute               | Element  | Usage                                                                                |
| ----------------------- | -------- | ------------------------------------------------------------------------------------ |
| `tabIndex="0"`          | `div`    | Includes the element in the `Tab` sequence.   |
| `role="list"`           |          | The ARIA `list` role can be used to identify a list of items. It is used to identify a list container. |
| `role="listitem"`       |          | The ARIA `listitem` role can be used to identify an item inside a list of items.                       |
| `aria-current="active"` | `div`    | `aria-current` state on an element indicates that this element represents the current item within a container or set of related elements. |
| `aria-label="Previous"` | `button` | Defines a string value that labels button that opens previous list item. It is a required for buttons without text content.  |
| `aria-label="Next"`     | `button` | Defines a string value that labels button that opens next list item. It is a required for buttons without text content.  |
| `aria-label="Close"`    | `button` | Provides an accessible name for the **Close** button.  |

## Resources

* Mozilla guides about [list role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) and [listitem role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role) have all necessary information for better understanding of how list works with screen readers.
* [W3 carousel examples](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) has detailed information about the accordion accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./carousel-a11y-report.md-->
