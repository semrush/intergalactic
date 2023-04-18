---
title: A11y
---

@## What component has

### Keyboard support

See detailed information for the controlling dropdown with the keyboard in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_popper).

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role   | Attribute            | Element           | Usage                                                                                                                                                                                                            |
| ------ | -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status |                      | `div`             | Defines a live region containing advisory information for the user that is not important enough to be an `alert`.                                                                                                |
|        | `aria-live="polite"` | Implicit on `div` | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle. |

@## Resources

- [W3 modal alert example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/alert/alert.html) and [W3 modal alert dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/alertdialog.html) have detailed information about the `alert` accessible behavior.
- Find useful information about `status` role in [MDN's guide for status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role).

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
