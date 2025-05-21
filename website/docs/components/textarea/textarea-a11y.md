---
title: Textarea
fileSource: textarea
a11y: AA
tabs: Design('textarea'), A11y('textarea-a11y'), API('textarea-api'), Example('textarea-code'), Changelog('textarea-changelog')
---

## What component has

### Keyboard support

For detailed information about keyboard support for the Input, refer to the [Keyboard control guide](/core-principles/a11y/a11y-keyboard#input-and-textarea).

## Considerations for developers

- Keep it simple - not all browsers correctly expose multiple labels that are linked to the same form element.
- Use labels for every input and make the `for=""` and `id=""` values match. IDs must be unique on each page, only one label can be associated to each unique form element. Make required fields obvious by using an indicator – asterisk, description text, etc.
- Fields with error validation should have `aria-describedby` to insure that the associated field level error message is read by assistive technology. If the error message has an `id="my-error-message"`, then the input should have `aria-describedby="my-error-message"`.

Find live examples in the [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields).

## Resources

- [A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields) describes core principles for the accessible inputs and textarea.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

For more accessibility recommendations, refer to the the common [Accessibility guide](/core-principles/a11y/a11y).
