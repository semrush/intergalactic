---
title: A11y
---

@## Considerations for developers

- Use the `label` element, and, in specific cases, other mechanisms (e.g. WAI-ARIA, title attribute etc.), to identify each form control.
- Use the `fieldset` and `legend` elements to group and associate related form controls.
- Validate input provided by the user and provide options to undo changes and confirm data entry.
- Use autocomplete attribute for common fields.
- When a form with errors is submitted, make sure focus is moved to the first field in error for inline errors or to the error container for top-of-form errors.

See [Forms Tutorial from W3](https://www.w3.org/WAI/tutorials/forms/) for the detailed information and links.

### Keyboard support

See detailed information about the keyboard support for the all form elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard/).

@## Considerations for designers

- Provide instructions to help users understand how to complete the form and individual form controls.
- Use autocomplete for common fields.
- Notify users about successful task completion, any errors, and provide instructions to help them correct mistakes.
- Divide long forms into multiple smaller forms that constitute a series of logical steps or stages and inform users about their progress.
- Don't use inputs in forms without a visible label. Placeholder text is not a suitable substitute as it disappears when users start typing, which is difficult for those with cognitive disabilities. Also, assistive technology may not recognize it as the field's name. Input labels should always be visible.
- Use appropriate form layout. Check [advantages and disadvantages of the vertical and horizontal form layouts](/patterns/form/#vertical_form_layout_vs_horizontal_form_layout).

@## Resources

[A11y style guide](https://a11y-style-guide.com/style-guide/section-forms.html) describes accessible behavior of all form elements.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
