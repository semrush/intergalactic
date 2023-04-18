---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

See detailed information about the keyboard support for the all clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/).

### Roles & attributes

> Note that it is necessary for elements that have attributes such as `aria-live` or `status` to be present before they are used.

The list below describes roles and attributes that component already has.

| Role   | Attribute               | Element                                                            | Usage                                                                                                                                                                                                                               |
| ------ | ----------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status |                         | `div`                                                              | Defines a live region containing advisory information for the user that is not important enough to be an `alert`.                                                                                                                   |
| alert  |                         | `div` (for message with `warning` and `danger` themes)             | Identifies the element as the container where alert content will be added or updated.                                                                                                                                               |
|        | `aria-live="polite"`    | Implicit on `div`                                                  | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle.                    |
|        | `aria-live="assertive"` | Implicit on `div` (for message with `warning` and `danger` themes) | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. |
|        | `aria-atomic="true"`    | Implicit on `div`                                                  | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to use the entire content of the alert element as the alert message even if only a portion of it has changed.  |

@## Considerations for developers

Note that it is necessary for elements that have attributes such as `aria-live` or `status` to be present before they are used.

@## Resources

[W3 modal alert example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/alert/alert.html) and [W3 modal alert dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/alertdialog.html) have detailed information about the `alert` accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
