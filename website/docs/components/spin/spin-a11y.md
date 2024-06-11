---
title: Spin
fileSource: spin
a11y: AA
tabs: Design('spin'), A11y('spin-a11y'), API('spin-api'), Example('spin-code'), Changelog('spin-changelog')
---

## What component has

### Roles and attributes

`Spin` is an `svg` element. It contains a `foreignObject`, which contains a `span` element with a loading message. The list below describes the attributes these elements already have.

Table: Roles & attributes

| Element  | Attribute               | Usage                                                      |
| -------- | ----------------------- | ---------------------------------------------------------- |
| `svg`    | `aria-busy="true"`      | Indicates that an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update. |
| `svg`    | `aria-label="Loading…"` | Sets an accessible name for the element.                   |
| `span`   | `role="status"`, `aria-live="polite"`         | Defines a region which receives updates that are important for the user to receive, but not so rapid as to be annoying. The screen reader will speak changes whenever the user is idle. These two attributes are used together for better compatibility with various technologies. |
| `span`   | `aria-atomic="true"`    | Instructs assistive technologies to announce the whole element with updated content, not only the updated parts.                   |

## Resources

- Detailed information about `aria-busy` state you can find in the [W3's guide](https://www.w3.org/TR/wai-aria-1.1/#aria-busy).
- [MDN's guide for aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy) describes core information for this state.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
