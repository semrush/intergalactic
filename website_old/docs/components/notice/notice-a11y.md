---
title: A11y
---

@## Keyboard support

See detailed information about the keyboard support for the all notice elements in the [Keyboard navigation guide](/core-principles/a11y/a11y-keyboard/).

@## Roles & attributes

Don't forget about the roles and attributes below if notice is triggered by an event, such as an error, warning condition, or the arrival of information that is important in the context of the user's task.

| Role  | Attribute               | Element           | Usage                                                                                                                                                                                                                               |
| ----- | ----------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alert |                         | `div`             | Identifies the element as the container where alert content will be added or updated.                                                                                                                                               |
|       | `aria-live="assertive"` | Implicit on `div` | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. |
|       | `aria-atomic="true"`    | Implicit on `div` | This does not have to be declared in the code because it is implicit in the alert role. Tells assistive technologies to use the entire content of the alert element as the alert message even if only a portion of it has changed.  |

@## Resources

[W3 modal alert example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/alert/alert.html) and [W3 modal alert dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/alertdialog.html) have detailed information about the alerts accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
