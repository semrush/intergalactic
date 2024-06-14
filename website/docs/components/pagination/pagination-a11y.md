---
title: Pagination
a11y: AA
tabs: Design('pagination'), A11y('pagination-a11y'), API('pagination-api'), Example('pagination-code'), Changelog('pagination-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |

See detailed information about the keyboard support for the buttons, links, inputs, etc., in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles & attributes

| Component | Role/tag  | Attribute                         |
| --------- | ----- |--------------------------------- |
| `Pagination` | `nav` | `aria-label="pagination"`         |
| `Pagination.FirstPage` | `button` | `aria-label="First page"`         |
| `Pagination.TotalPages` | `button` | `aria-label="Last page {number}"` |

## Considerations for designers & developers

Avoid inserting the `Pagination` component inside tables, as the navigation (`nav` tag) cannot be inserted inside other tags.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
