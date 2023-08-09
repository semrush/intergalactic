---
title: A11y
fileSource: dropdown-menu
a11y: AA
---

## What component has

When dropdown is closed, the focus returns to the trigger.

### Keyboard support

User can navigate inside the list with the keyboard arrows.

| Key                            | Function                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                          | Moves focus to the next focusable element.                                                                                                |
| `Shift + Tab`                  | Moves focus to the previous focusable element.                                                                                            |
| `Space`, `Enter`, `Down Arrow` | When focus is on the trigger, opens the dropdown.                                                                                         |
| `Up Arrow`, `Down Arrow`       | Moves focus between the options in the dropdown. If focus is on the last/first option, moves focus to the first/last option respectively. |
| `Space`, `Enter`               | Selects the option and closes the dropdown.                                                                                               |
| `Esc`                          | Closes the dropdown.                                                                                                                      |

See detailed information for the controlling dropdown with the keyboard in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_popper).

### Roles & attributes

The list below describes roles and attributes that component already has.

| Role       | Attribute    | Element | Usage                                                                                                                                                                                         |
| ---------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combobox` |              | `div`   | The `combobox` role identifies an element as an input that controls another element, such as a `listbox` or `grid`, that can dynamically pop up to help the user set the value of that input. |
|            | `aria-label` | `div`   | The `aria-label` attribute defines a string value that labels an interactive element.                                                                                                         |
|            | `tabIndex`   | `div`   | Makes the trigger focusable and includes it in the page `Tab` sequence. This approach to managing focus is described in the section on roving tabindex.                                       |

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include dropdown-menu-a11y-report
