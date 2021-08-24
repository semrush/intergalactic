---
title: A11y
---

> ### General recommendations
>
> - Keep it simple - not all browsers correctly expose multiple labels that are linked to the same form element.
> - Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element.
>   Make required fields obvious by using an indicator — border color change, asterisk, description text, etc.
> - Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.
>
> [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields)

@## Keyboard support

See detailed information about the keyboard support for the Input in the [Keyboard navigation guide](/core-principles/a11y/a11y-keyboard/#ae2a0e).

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
