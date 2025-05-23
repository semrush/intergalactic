---
title: InputNumber & InputRange
fileSource: input-number
a11y: AA
tabs: Design('input-number'), A11y('input-number-a11y'), API('input-number-api'), Example('input-number-code'), Changelog('input-number-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                              | Function                                       |
| -------------------------------- | ---------------------------------------------- |
| `Tab`                            | Moves focus to the next focusable element.     |
| `Shift + Tab`                    | Moves focus to the previous focusable element. |
| `Up Arrow` or `Shift` + `Up Arrow`     | Increases the value.                           |
| `Down Arrow` or `Shift` + `Down Arrow` | Decreases the value.                           |
| `Enter`                          | Submits the entered value.                     |

See detailed information about the keyboard support for the input fields in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

### Roles & attributes

"The implicit role for the `<input type="number">` element is `spinbutton`. If `spinbutton` isn’t an important feature for your form control, consider not using type="number". Instead, use `inputmode="numeric"` along with a pattern attribute that limits the characters to numbers and associated characters. With `<input type="number">`, there is a risk of users accidentally incrementing a number when they're trying to do something else. Additionally, if users try to enter something that's not a number, there's no explicit feedback about what they're doing wrong."

Find more in MDN guides:

- [input type="number"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#accessibility)
- [spinbutton role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role)

InputNumber also has the same accessibility recommendations as [Input](/components/input/input-a11y) has.

## Considerations for designers

- Focus must be visible.
- Don’t hide the input label on focus.

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) from W3C helps you understand common methods for creating accessible forms.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
