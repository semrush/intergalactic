---
title: Hint
tabs: Design('hint'), A11y('hint-a11y'), API('hint-api'), Example('hint-code'), Changelog('hint-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key   | Function                                    |
| ----- | ------------------------------------------- |
| `Esc` | Hides the hint when its trigger is focused. |

### Roles and attributes

The following list describes roles and attributes that the component already has.

Table: Roles and attributes

| Element        | Attribute                  | Usage                                                                    |
| -------------- | -------------------------- | ------------------------------------------------------------------------ |
| Hint's trigger | `aria-label`               | `aria-label` is automatically populated with the Hint's text.            |
| Hint's popper  | <nobr>`aria-hidden`</nobr> | Hides the popper from assistive technology to prevent redundant reading. |
