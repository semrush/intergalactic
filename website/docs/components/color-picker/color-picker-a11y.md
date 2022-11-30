---
title: A11y
a11y: AA
---

Color picker component provides basic support for keyboard and screen readers.

@include color-picker-a11y-report

@## What component has

- A user can navigate inside the color palettes with the keyboard `arrows`. The color transition occurs sequentially—from top to bottom and from left to right. If a component has two palettes, when tabbed, the focus of the last element of the main palette skips to the first element of the additional palette.
- When the dropdown is closed, the focus returns to the trigger.

### Keyboard support

| Key              | Function                                       |
| ---------------- | ---------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element.     |
| `Shift + Tab`    | Moves focus to the previous focusable element. |
| `Space`, `Enter` | Activates the selected color.                  |
| `Esc`            | Closes the dropdown.                           |

@## Resources

- [ColorPicker - Accessibility](https://www.htmlelements.com/docs/colorpicker-accessibility/) has detailed information about the colorpicker accessible behavior.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
