---
title: A11y
fileSource: input-number
---

@## What component has

### Keyboard support

| Key                              | Function                           |
| -------------------------------- | ---------------------------------- |
| `Tab`                            | Moves keyboard focus to the input. |
| `Up` arrow or `Shift` + `Up`     | Increases the value.               |
| `Down` arrow or `Shift` + `Down` | Decreases the value.               |
| `Enter`                          | Submits the entered value.         |

See detailed information about the keyboard support for the input fileds in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/#input_i_textarea).

### Roles & attributes

"The implicit role for the `<input type="number">` element is spinbutton. If spinbutton is not an important feature for your form control, consider not using type="number". Instead, use `inputmode="numeric"` along with a pattern attribute that limits the characters to numbers and associated characters. With `<input type="number">`, there is a risk of users accidentally incrementing a number when they're trying to do something else. Additionally, if users try to enter something that's not a number, there's no explicit feedback about what they're doing wrong."

Find more in [MDN guides](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#accessibility).

InputNumber has the same accessibility recommendations as [Input](/components/input/input-a11y/) has.

@## Considerations for designers

- Focus must be visible.
- Don’t hide the input label on focus.

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
