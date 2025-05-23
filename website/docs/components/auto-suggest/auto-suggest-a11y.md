---
title: AutoSuggest
a11y: AA
tabs: Design('auto-suggest'), A11y('auto-suggest-a11y'), Example('auto-suggest-code')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                            | Function                                                       |
| ------------------------------ | -------------------------------------------------------------- |
| `Tab` | Moves focus to the next focusable element.                                             |
| `Shift + Tab` | Moves focus to the previous focusable element.                                 |
| `Enter` | **When the dropdown is closed:** opens the dropdown. <br>**When the dropdown is open:** closes the dropdown. If an option was selected, applies its value to the input.  |
| `Up Arrow` , <nobr>`Down Arrow`</nobr> | **When the dropdown is closed:** opens the dropdown. <br>**When the dropdown is open:** moves selection between the options in the list. If the last/first option is selected, moves selection to the first/last option respectively. |
| `Esc` | Closes the dropdown. |

### Roles and attributes

For more information about the accessibility of these patterns, refer to the documentation of the components used in them:

* [Input](/components/input/input-a11y)
* [Select](/components/select/select-a11y)
<!-- * [Keyboard support for popper](/core-principles/a11y/a11y-keyboard#keyboard-support-for-popper) -->

## Other recommendations

For more accessibility recommendations, refer to the [Accessibility guide](/core-principles/a11y/a11y).
