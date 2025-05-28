---
title: Input
fileSource: input
a11y: AA
tabs: Design('input'), A11y('input-a11y'), API('input-api'), Example('input-code'), Changelog('input-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Enter`       | Submits the entered value.                     |
| `Backspace`   | Erases character or symbol before the cursor.  |

See detailed information about the keyboard support for the inputs in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

## Considerations for developers

- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Keep it simple – do not all browsers correctly expose multiple labels that are linked to the same form element. [Refer to our examples](/components/input/input-code).
- Make optional fields obvious by adding text "optional" to the input.
- Inputs with the `invalid` state should be associated with their error message using `aria-describedby`.

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) from W3C helps you understand common methods for creating accessible forms.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
