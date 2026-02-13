---
title: Validation
tabs: Design('validation-form'), A11y('validation-form-a11y'), Example('validation-form-code')
---

## Considerations for developers

- Identify the field name in the error message.
- Associate errors with their corresponding form field using the `aria-describedby` attribute.
- Use live regions to communicate dynamically appearing error messages to assistive technology.

Refer to [Form](/patterns/form/form-a11y) for the recommendations on how to make the form accessible.

### Keyboard support

Find detailed information about keyboard support for all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

## Considerations for designers

- Use text or an icon with alternative text, not just color, to indicate errors. Use the word "Error" or an error icon with alternative text.
- Provide suggestions for how to correct the error when known.

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html) describes accessible behavior of all form elements.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
