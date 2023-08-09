---
title: A11y
a11y: AA
---

Color picker component provides basic support for keyboard and screen readers.

## What component has

- User can navigate inside the color palettes with the keyboard arrows. The color transition occurs sequentially – from top to bottom and from left to right. If the component has two palettes, when tabbed, the focus of the last element of the main palette skips to the first element of the additional palette.
- When dropdown is closed, the focus returns to the trigger.

### Keyboard support

| Key              | Function                                       |
| ---------------- | ---------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element.     |
| `Shift + Tab`    | Moves focus to the previous focusable element. |
| `Space`, `Enter` | Activates the selected color.                  |
| `Esc`            | Closes the dropdown.                           |

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role       | Attribute    | Element | Usage                                                                                                                                                                                         |
| ---------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combobox` |              | `div`   | The `combobox` role identifies an element as an input that controls another element, such as a `listbox` or `grid`, that can dynamically pop up to help the user set the value of that input. |
|            | `aria-label` | `div`   | The `aria-label` attribute defines a string value that labels an interactive element.                                                                                                         |
|            | `tabIndex`   | `div`   | Makes the trigger focusable and includes it in the page `Tab` sequence. This approach to managing focus is described in the section on roving tabindex.                                       |

## Resources

[Type attribute in the Color state](https://w3c.github.io/html-aam/#el-input-color) has accessibility spec for input type color.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include color-picker-a11y-report

## What component has

- A user can navigate inside the color palettes with the keyboard `arrows`. The color transition occurs sequentially – from top to bottom and from left to right. If a component has two palettes, when tabbed, the focus of the last element of the main palette skips to the first element of the additional palette.
- When the dropdown is closed, the focus returns to the trigger.

### Keyboard support

| Key              | Function                                       |
| ---------------- | ---------------------------------------------- |
| `Tab`            | Moves focus to the next focusable element.     |
| `Shift + Tab`    | Moves focus to the previous focusable element. |
| `Space`, `Enter` | Activates the selected color.                  |
| `Esc`            | Closes the dropdown.                           |

## Resources

- [ColorPicker - Accessibility](https://www.htmlelements.com/docs/colorpicker-accessibility/) has detailed information about the colorpicker accessible behavior.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
