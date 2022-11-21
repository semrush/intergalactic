---
title: A11y
fileSource: tooltip
a11y: AA
---

@## What component has

### Keyboard support

| Key   | Function            |
| ----- | ------------------- |
| `Esc` | Closes the tooltip. |

### Roles and attributes

The list below describes roles and attributes that component already has.

| Role      | Attribute                 | Element                                                   | Usage                                                                                                                                                                                                                                                             |
| --------- | ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tooltip` |                           | `div`                                                     | It's a contextual text bubble that displays a description for an element that appears on pointer hover or keyboard focus.                                                                                                                                         |
|           | `aria-live="polite"`      | Implicit on `div`                                         | Any region which receives updates that are important for the user to receive, but not so rapid as to be annoying, should receive this attribute. The screen reader will speak changes whenever the user is idle.                                                  |
|           | `aria-live="assertive"`   | Implicit on `div` (only for tooltip with `warning` theme) | Tells assistive technologies to interrupt other processes to provide users with immediate notification of relevant alert container changes. Should only be used for time-sensitive/critical notifications that absolutely require the user's immediate attention. |
|           | `aria-labelledby="IDREF"` | `div`                                                     | Refers to the element containing the name of the tooltip.                                                                                                                                                                                                         |

@## Considerations for developers

- Tooltips should not receive focus. The focus should remain on the field, button, or link the tooltip is about.
- When open, tooltips should not block a user from performing any task on the page.
- Tooltips should not be revealed until a short time has passed (~1-5 seconds).
- Depending on the tooltip option you choose, there may be additional ARIA tags you should apply. Add `aria-describedby="example1"` on an input field and link it to a related section with a matching ID selector `id="example1"`.
- Whenever possible, use descriptive text on your form fields that does need to be activated by a focus or hover event. Tooltips can be problematic for some assistive technologies (AT) devices.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips).

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips) describes core principles for the accessible inputs and textarea.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
