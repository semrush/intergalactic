---
title: A11y
fileSource: input
a11y: AA
---

## What component has

### Keyboard support

| Key           | Function                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element.     |
| `Shift + Tab` | Moves focus to the previous focusable element. |
| `Enter`       | Submits the entered value.                     |

See detailed information about the keyboard support for the input fields in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#input_i_textarea).

## Considerations for developers

- Keep it simple – not all browsers correctly expose multiple labels that are linked to the same form element.
- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Make required fields obvious by using an indicator – asterisk, description text, etc.
- Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields).

## Considerations for designers

- Focus must be visible.
- Don’t hide the input label on focus.

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) from W3C helps you understand common methods for creating accessible forms.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
