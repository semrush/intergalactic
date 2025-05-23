---
title: InlineEdit
a11y: AA
tabs: Design('inline-edit'), A11y('inline-edit-a11y'), API('inline-edit-api'), Example('inline-edit-code'), Changelog('inline-edit-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.                                                          |
| `Shift + Tab` | Moves focus to the previous focusable element.                                                      |
| `Enter`       | Opens edit mode (shows [InlineInput](/components/inline-input/inline-input-code)) for entering a value. In edit mode, saves the entered data and returns to view mode. |
| `Esc`         | Returns from edit mode to view mode and discards any entered data that wasn't submitted.                                                                |

See detailed information about the keyboard support for the input fileds in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

## Considerations for developers

- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Keep it simple: not all browsers correctly expose multiple labels that are linked to the same form element. [Refer to our examples](/components/inline-edit/inline-edit-code).
- Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.

## Considerations for designers

Avoid hiding the input label on focus.

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).