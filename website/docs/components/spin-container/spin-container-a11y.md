---
title: SpinContainer
fileSource: spin-container
a11y: AA
tabs: Design('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

## What component has

### Roles and attributes

The following list describes roles and attributes that component already has.

Table: Roles & attributes

| Element                 | Attribute          | Usage                                                                             |
| ----------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `SpinContainer.Content` | `inert`            | Indicates that the content is unavailable for the user. |

Read also: [Spin A11y](/components/spin/spin-a11y).

## Considerations for developers

Make sure the user is aware that loading has started or ended. There are two ways to do that, depending on the user flow:

1. If the `SpinContainer` appears on top or instead of the last focused element, such as when submitting a form, focus the `Overlay` or its parent when the loading starts, and focus the content when it's loaded. Make sure focus is invisible if the focused element is noninteractive.
2. In other cases, moving focus is usually undesirable, so add `role="status"` and `aria-live="polite"` attributes to the `SpinContainer`.

## Resources

[Read more about ARIA live regions on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

## Other recommendations

Find more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
