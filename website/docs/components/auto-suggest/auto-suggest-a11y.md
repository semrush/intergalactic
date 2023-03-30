---
title: A11y
a11y: AA
---

@## What component has

### Keyboard support

| Key                            | Function                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                          | Moves focus to the next focusable element.                                                                                                |
| `Shift + Tab`                  | Moves focus to the previous focusable element.                                                                                            |
| `Space`, `Enter`, `Down` arrow | When focus is on the AutoSuggest trigger, opens the dropdown with options.                                                                |
| `Up`, `Down` arrows            | Moves focus between the options in the dropdown. If focus is on the last/first option, moves focus to the first/last option respectively. |
| `Space`, `Enter`               | Selects the option and closes the dropdown.                                                                                               |
| `Esc`                          | Closes the dropdown and returns focus to the AutoSuggest trigger.                                                                         |

See detailed information for the controlling dropdown with the keyboard in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_dropdown).

### Roles and attributes

- For more information about the radio or checkbox list, see [Radiobutton](/components/radio/radio-a11y/) and [Checkbox](/components/checkbox/checkbox-a11y/) guides.
- For information about the dropdown behavior, see [Keyboard support for dropdown](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_dropdown).
- Fo more information about the input behavior, refer to [Input](/components/input/input-a11y/).

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-select-lists) gives recommendations for the accessible select menus and lists.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include auto-suggest-a11y-report
