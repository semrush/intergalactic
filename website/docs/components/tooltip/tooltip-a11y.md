---
title: Tooltip
fileSource: tooltip
a11y: AA
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key   | Function            |
| ----- | ------------------- |
| `Esc` | Closes the tooltip. |

### Focus behavior

1. For `Hint`, the popper is not focusable.
2. In the case of `Tooltip`, the popper becomes focusable if it contains any focusable elements.
3. With `InformationDropdown`, the popper is always focusable and automatically receives focus when opened.

### Hint attributes

The list below describes attributes that `Hint` component has.

Table: Hint attributes

| Attribute                 | Element  | Usage                                                                                                                                                                                                                                                             |
| ------------------------- | -------- | -------------------------------------------------------------------- |
| `aria-hidden` | popper   | `Hint` popper is hidden from assistive technologies.                   |
| `aria-label` | trigger  | The applied trigger text matches the text in the popper.  |

### Tooltip roles and attributes

The list below describes roles and attributes that `Tooltip` component has.

Table: Roles and attributes

| Role      | Attribute                 | Element                                                   | Usage                                                                                                                                                                                                                                                             |
| --------- | ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tooltip` |                           | `div` | It's a contextual text bubble that displays a description for an element that appears on pointer hover or keyboard focus.                                                                                                                                         |
|           | `aria-describedby` | trigger                                                   | Allows assistive technologies to announce a trigger description by popper content. If you need to set it on another element, checkout [the accessability example](/components/tooltip/tooltip-code#popper-trigger-accessibility).                                                |
|           | `aria-live="polite"` | Implicit on `div` | Used to keep component accessible with browsers and screen readers that doesn't support `aria-describedby` . Assistive technologies will announce popper content when it's opened or changed.                                                                      |
|           | `aria-live="assertive"` | Implicit on `div` (only for tooltip with `warning` theme) | Same to `aria-live="polite"` . |

### InformationDropdown roles and attributes

The list below describes roles and attributes that `InformationDropdown` component has.

Table: Roles and attributes

| Role      | Attribute                 | Element                                                   | Usage                                                                                                                      |
| --------- | ------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `tooltip` |                           | `div` | It's a contextual text bubble that displays a description for an element that appears on pointer hover or keyboard focus.  |
|           | `aria-haspopup` | trigger                                                   | Helps assistive technologies to indicate that trigger has corresponding dropdown.                                          |
|           | `aria-expanded` | trigger                                                   | Added when popper is visible. Helps assistive technologies to indicate that opened dropdown.                               |

## Considerations for developers

* When open, tooltips shouldn't block a user from performing any task on the page.
* Tooltips shouldn't be revealed until a short time has passed (~1-5 seconds).
* Whenever possible, use descriptive text on your form fields that does need to be activated by a focus or hover event. Tooltips can be problematic for some assistive technologies (AT) devices.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips).

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-tooltips) describes core principles for the accessible inputs and textarea.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
