---
title: A11y
fileSource: spin
a11y: AA
---

## What component has

### Roles and attributes

The list below describes roles and attributes that component already has.

| Attribute          | Element           | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aria-busy="true"` | Implicit on `svg` | The `aria-busy` state indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update. When multiple parts of a live region need to be loaded before changes are announced to the user, set `aria-busy="true"` until loading is complete. Then set to `aria-busy="false"`. This prevents assistive technologies from announcing changes before updates are done. |

## Considerations for developers

### Roles and attributes

The list below will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

| Attribute            | Element           | Usage                                                                                                                                                                                                            |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-live="polite"` | Implicit on `div` | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle. |

## Resources

- Detailed information about `aria-busy` state you can find in the [W3's guide](https://www.w3.org/TR/wai-aria-1.1/#aria-busy).
- [MDN's guide for aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy) describes core information for this state.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
