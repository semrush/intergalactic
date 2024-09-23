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
| `Enter`, `Space` | When focus is on the breadcrumb, opens the link. |

### Roles & attributes

The following list describes roles and attributes that component already has.

Table: Roles and attributes

| Element            | Roles & attributes         | Usage                                                                                                                                  |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Breadcrumbs`      | `nav`                      | Represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. |
| `Breadcrumbs`      | `aria-label="Breadcrumbs"` | Provides a label for the group of links that describes the type of navigation provided.                                                |
| `Breadcrumbs.Item` | `aria-current="page"`      | Applied to the last link in the set to indicate that it represents the current page.                                                   |

## Considerations for designers & developers

Don't forget to check that long text in links is truncated with an `ellipsis`, and the full text is displayed in a tooltip when there isn't enough space.

## Resources

- [W3 breadcrumbs example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html) has detailed information about the breadcrumbs accessible behavior.
- [A11y style guide](https://a11y-style-guide.com/style-guide/section-navigation.html) gives recommendations for the accessible components.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
