---
title: Form
tabs: Design('form'), A11y('form-a11y'), Example('form-code')
---

## Considerations for developers

- Make sure each form control is labeled using `<label>`, `aria-labelledby`, or `aria-label`.
- Use `fieldset` and `legend` elements to group and label related form controls.
- Validate input provided by the user and provide options to undo changes and confirm data entry.
- Use appropriate `type` and `autocomplete` attributes in inputs for personal data, such as email, phone number, or credit card number. Read more in the [MDN autocomplete guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values).
- When a form with errors is submitted, make sure focus is moved to the first invalid field for inline errors, or to the error container for top-of-form errors.

Read the [Forms Tutorial from W3](https://www.w3.org/WAI/tutorials/forms/) for more information and sources.

### Keyboard support

Read more about keyboard support for all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

## Considerations for designers

- Provide instructions to help users understand how to complete the form and individual form controls.
- Use appropriate `type` and `autocomplete` attributes in inputs for personal data, such as email, phone number, or credit card number. Read more in the [MDN autocomplete guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values).
- Notify users about successful task completion, any errors, and provide instructions to help them correct mistakes.
- Divide long forms into multiple smaller forms that constitute a series of logical steps or stages and inform users about their progress.
- Show visible labels for inputs. Placeholder text isn’t a suitable substitute as it disappears when users start typing, which is difficult for those with cognitive disabilities. Also, assistive technology may not recognize it as the field's name. Input labels should always be visible.
- Use appropriate form layout. Check [advantages and disadvantages of the vertical and horizontal form layouts](/patterns/form/form#vertical-form-layout-vs-horizontal-form-layout).

## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html) describes accessible behavior of all form elements.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
