---
title: A11y
---

@## Keyboard support

| Key              | Function              |
| ---------------- | --------------------- |
| `Space`, `Enter` | Activates the button. |

@## Roles & attributes

| Role   | Attribute              | Element    | Usage                                                                                                                    |
| ------ | ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| button |                        | `div`, `a` | Identifies the element as a button widget. Accessible name for the button is defined by the text content of the element. |
|        | `tabindex="0"`         | `div`, `a` | Includes the element in the `Tab` sequence. Needed on the `a` element because it does not have a `href` attribute.       |
|        | `aria-pressed="false"` | `a`        | Identifies the button as a toggle button. Indicates the toggle button is not pressed.                                    |
|        | `aria-pressed="true"`  | `a`        | Identifies the button as a toggle button. Indicates the toggle button is pressed.                                        |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@## Resources

[W3 button examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html) has detailed information about the accordion accessible behavior.
