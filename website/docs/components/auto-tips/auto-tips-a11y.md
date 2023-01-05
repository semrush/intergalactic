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

### Roles and attributes

- `tabindex="0"` includes the element in the `Tab` sequence.
- For more information about the radio or checkbox list see [Radiobutton](/components/radio/radio-a11y/) and [Checkbox](/components/checkbox/checkbox-a11y/) guides.
- For information about the dropdown behavior see [Keyboard support for dropdown](/core-principles/a11y/a11y-keyboard/#keyboard_support_for_dropdown).

@## Considerations for developers

- The `<fieldset>` surrounds the entire grouping of checkboxes or radio buttons. The `<legend>` provides a description for the grouping.
- Some assistive technology reads the legend text for each fieldset, so it should be brief and descriptive. This helps someone using assistive technology to understand the question they are answering with the group of radio buttons.
- For select elements with groups of options, the `optgroup` element can be used to indicate such groups. The `label` attribute of the `optgroup` element is used to provide a label for the group. This is especially useful for lists with many related options.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-select-lists).

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-select-lists) gives core recommendations for the accessible select menus and lists.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).

@include auto-tips-a11y-report
