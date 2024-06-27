---
title: SpinContainer
fileSource: spin-container
a11y: AA
tabs: Design('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

Table: Roles & attributes

| Attribute          | Element                 | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aria-busy="true"` | Implicit on container.  | The `aria-busy` state indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update. When multiple parts of a live region need to be loaded before changes are announced to the user, set `aria-busy="true"` until loading is complete. Then set to `aria-busy="false"`. This prevents assistive technologies from announcing changes before updates are done. |
| `inert`            | Implicit on content.    | The `inert` attribute indicated that it's content should not be available for interacting by the user.                                                                                                                                                                                                                                                                                                                                                             |

See attributes applied to Spin on the [Spin A11y page](/components/spin/spin-a11y).

## Considerations for developers

## Resources

- Detailed information about `aria-busy` state you can find in the [W3's guide](https://www.w3.org/TR/wai-aria-1.1/#aria-busy).
- [MDN's guide for aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy) describes core information for this state.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
