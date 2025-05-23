---
title: InlineInput
a11y: AA
tabs: Design('inline-input'), A11y('inline-input-a11y'), API('inline-input-api'), Example('inline-input-code'), Changelog('inline-input-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Enter`       | Submits the entered value.                     |
| `Esc`         | Returns from edit mode to view mode.           |

See detailed information about the keyboard support for the input fileds in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

## Considerations for developers

- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Keep it simple: not all browsers correctly expose multiple labels that are linked to the same form element. [Refer to our examples](/components/inline-input/inline-input-code).
- Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.

## Considerations for designers

Avoid hiding the input label on focus.

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
