---
title: A11y
a11y: AA
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

| Attribute            | Element           | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aria-busy="true"`   | Implicit on `svg` | The `aria-busy` state indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update. When multiple parts of a live region need to be loaded before changes are announced to the user, set `aria-busy="true"` until loading is complete. Then set to `aria-busy="false"`. This prevents assistive technologies from announcing changes before updates are done. |
| `aria-atomic="true"` |                   | In ARIA live regions, the global `aria-atomic` attribute indicates whether assistive technologies such as a screen reader will present all, or only parts of.                                                                                                                                                                                                                                                                                                      |

## Considerations for developers and designers

- Don't use heading markup for skeleton "bones" that replace headings, as this can be confusing for screen reader users who navigate the page using landmarks.
- Since the skeleton is a visual element, make sure the image replacements for it are marked as decorative (using `aria-hidden="true"`) and hidden from screen reader users.
- It's important to let screen readers access the text behind a skeleton loader.

## Resources

- Detailed information about `aria-busy` state you can find in the [W3's guide](https://www.w3.org/TR/wai-aria-1.1/#aria-busy).
- [MDN's guide for aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy) describes core information for this state.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
