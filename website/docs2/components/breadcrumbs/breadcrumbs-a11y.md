---
title: Breadcrumbs
a11y: AA
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key              | Function                                         |
| ---------------- | ------------------------------------------------ |
| `Tab`            | Moves focus to the next focusable element.       |
| `Shift + Tab`    | Moves focus to the previous focusable element.   |
| `Space`, `Enter` | When focus is on the breadcrumb, opens the link. |

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles and attributes

| Role    | Attribute                 | Element | Usage                                                                                                                                                             |
| ------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `group` |                           |         | The `group` role identifies a set of user interface objects that isn’t intended to be included in a page summary or table of contents by assistive technologies. |
|         | `aria-label="Breadcrumbs"` | `div`   | Provides a label for the group of links that describes the type of navigation provided.                                                                             |
|         | `aria-current="page"`     | `a`     | Applied to the last link in the set to indicate that it represents the current page.                                                                              |

## Resources

- [W3 breadcrumbs example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html) has detailed information about the accordion accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-navigation.html) gives recommendations for the accessible components.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
