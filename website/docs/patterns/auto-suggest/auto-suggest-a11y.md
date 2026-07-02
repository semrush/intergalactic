---
title: AutoSuggest
tabs: Design('auto-suggest'), A11y('auto-suggest-a11y'), API('auto-suggest-api'), Examples('auto-suggest-code'), Changelog('auto-suggest-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                            | Function                                                       |
| ------------------------------ | -------------------------------------------------------------- |
| `Tab` | Moves focus to the next focusable element.                                             |
| `Shift + Tab` | Moves focus to the previous focusable element.                                 |
| `Enter` | **When the menu is closed:** opens the menu. <br>**When the menu is open:** closes the menu. If an option has been highlighted, applies its value to the input.  |
| `Up Arrow`, <nobr>`Down Arrow`</nobr> | **When the menu is closed:** opens the menu. <br>**When the menu is open:** moves the highlight between the list options. The highlight cycles from the last to the first option and from the first to the last option. |
| `Esc` | Closes the menu. <br>The menu doesn't reopen until the user blurs and focuses it again, or presses `Enter`, `Up Arrow`, or `Down Arrow`. |

### Roles and attributes

For more information about the accessibility of these patterns, refer to the documentation of the components used in them:

* [Input](/components/input/input-a11y)
* [Select](/components/select/select-a11y)
<!-- * [Keyboard support for popper](/core-principles/a11y/a11y-keyboard#keyboard-support-for-popper) -->

## Other recommendations

For more accessibility recommendations, refer to the [Accessibility guide](/core-principles/a11y/a11y).
