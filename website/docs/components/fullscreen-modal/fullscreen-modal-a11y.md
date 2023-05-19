---
title: A11y
a11y: AA
---

## What component has

### Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Esc`         | Closes the modal window.                       |

- See detailed information about the keyboard support for the all buttons, input, etc., in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/).
- Don't forget to check recommendations on accessibility for [Form](/patterns/form/form-a11y).

## Considerations for developers

- If the fullscreen modal blocks control of the parent page, update the page title.
- Properly structure the headers and titles of all full screen modals with appropriate heading markup and hierarchy.

## Resources

[W3 modal dialog example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) has detailed information about the modal window accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
