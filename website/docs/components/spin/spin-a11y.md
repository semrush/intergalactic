---
title: Spin
fileSource: spin
a11y: AA
tabs: Design('spin'), A11y('spin-a11y'), API('spin-api'), Changelog('spin-changelog')
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

Table: Roles & attributes

| Attribute               | Element              | Usage                                                                                                                                                                                    |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-busy="true"`      | Implicit on `svg`    | The `aria-busy` state indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update. |
| `aria-label="Loading…"` | Implicit on `svg`    | The `aria-label` attribute sets the element description that will be announced by the assistive technologies.                                                                            |

Spin is an `svg` element. It contains `foreignObject` with a `span` element inside. The `span` element has a `role="status"`, `aria-atomic="true"` and `aria-live="polite"` attribute. These attributes are used to inform assistive technologies about the loading state.

## Resources

- Detailed information about `aria-busy` state you can find in the [W3's guide](https://www.w3.org/TR/wai-aria-1.1/#aria-busy).
- [MDN's guide for aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy) describes core information for this state.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
