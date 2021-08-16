---
title: A11y
---

@## Keyboard support

| Key     | Function                                               |
| ------- | ------------------------------------------------------ |
| `Tab`   | Moves keyboard focus to the checkbox.                  |
| `Space` | Toggles checkbox between checked and unchecked states. |

@## Attributes and elements

| Role     | Attribute      | Element | Usage                                                                                                                        |
| -------- | -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| checkbox |                | `div`   | Identifies the div element as a checkbox. The child text content of this `div` provides the accessible name of the checkbox. |
|          | `tabindex="0"` | `div`   | Includes the checkbox in the page `Tab` sequence.                                                                            |

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@## Resources

[W3 checkbox example and documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-1/checkbox-1.html) has detailed information about the accordion accessible behavior.
