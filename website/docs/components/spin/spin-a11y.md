---
title: Spin
fileSource: spin
a11y: AA
tabs: Design('spin'), A11y('spin-a11y'), API('spin-api'), Example('spin-code'), Changelog('spin-changelog')
---

## What component has

### Roles and attributes

Table: Roles & attributes

| Attribute               | Usage                                                      |
| ----------------------- | ---------------------------------------------------------- |
| `aria-label="Loading…"` | Sets an accessible name for the element.                   |

## Considerations for developers

- Place `Spin` inside a container with `role="status"` and `aria-live="polite"` attributes for the screen reader to announce the start of the loading process ([example](./spin-code#basic-usage)).
- If there's more than one `Spin` in a `Table`, a `Card`, or another container, and they can start or finish loading simultaneously, add the `aria-busy="true"` attribute to the container and set it to `false` when all items have finished loading. This ensures the user isn't repeatedly notified about the loading of each element.

## Resources

- You can find a detailed description of the `aria-busy` state in the [W3's guide](https://www.w3.org/TR/wai-aria-1.1/#aria-busy).
- [MDN's guide for aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy) describes core information for this state.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
